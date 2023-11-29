<template>
  <div class="online-info">
    <div class="top-status-info">
      <div class="span-wrapper"><span class="span4"></span> {{$tcache('common.onLine')}}</div>
      <div class="span-wrapper"><span class="span1"></span> {{$tcache('onlineInfo.dockingOpen')}}</div>
      <div class="span-wrapper"><span class="span2"></span> {{$tcache('onlineInfo.dockingClosed')}}</div>
      <div class="span-wrapper"><span class="span3"></span> {{$tcache('common.offLine')}}</div>
    </div>
    <div class="online-info-content">
      <a-tabs type="card" tab-position="left" size="small" :activeKey="noTitleKey" @change="onTabChange"> 
        <a-tab-pane v-for="t in tabListNoTitle" :key="t.key" :tab="t.tab">
          <div class="station-content" v-show="noTitleKey === 'all'">
            <div class="group-wrapper" v-for="(value, key) in station_data" :key="key">
              <h3 class="group-title">{{getStationName(key)}}</h3>
              <div class="single-group-list" style="padding:0px 12px">
                <a-col @click="recordEdit(item,key,k)" v-for="(item,k) in value" :key="item.id" span="12" :title="'ip:'+item.ip+' | '+$tcache('onlineInfo.numberFeedingBaskets')+':'+item.inNum+' | '+$tcache('onlineInfo.numberDischargeBaskets')+':'+item.outNum">
                  <a-card-grid
                    style="display:flex; align-items: center; justify-content: space-between;margin-top:4px;height:30px"
                    :style="{ backgroundColor: item.offline == true ? '#8b8b81' : '#93c94d', color: 'white', width: '100%' }">
                    <a-switch v-if="editable||isAdmin" @click="changeEnabled(item,key,k)" :checked="item.enabled" :checked-children="$tcache('onlineInfo.open')" :un-checked-children="$tcache('onlineInfo.close')" />
                    <span style="font-weight: bold;">{{ item.doPoint }}：{{ item.name }}<span v-if="item.controlState&&item.controlState!==1" :style="{color:'#c32a2a'}">({{$tcache('onlineInfo.abnormal')}})</span></span>
                    <span v-if="item.enabled" class="span1"></span>
                    <span v-if="!item.enabled" class="span2"></span>
                  </a-card-grid>
                </a-col>
              </div>
            </div>
          </div>
          <div class="station-content" v-show="noTitleKey!=='all'">
            <div class="group-wrapper single-group">
              <h3 class="group-title">{{getStationName(noTitleKey)}}</h3>
              <div class="single-group-list">
                <a-col @click="recordEdit(item,noTitleKey,k)" v-for="(item,k) in station_data[noTitleKey]" :key="item.id" span="6" :title="'ip：'+item.ip">
                  <a-card-grid
                    style="display:flex; align-items: center; justify-content: space-between;margin-top:4px;height:30px"
                    :style="{ backgroundColor: item.offline == true ? '#8b8b81' : '#93c94d', color: 'white'}">
                    <a-switch v-if="editable||isAdmin" @click="changeEnabled(item,noTitleKey,k)" :checked="item.enabled" :checked-children="$tcache('onlineInfo.open')" :un-checked-children="$tcache('onlineInfo.close')" />
                    <span style="font-weight: bold;">{{ item.doPoint }}：{{ item.name }}</span>
                    <span v-if="item.enabled" class="span1"></span>
                    <span v-if="!item.enabled" class="span2"></span>
                  </a-card-grid>
                </a-col>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- 修改记录弹窗 -->
    <a-modal
        :title="$tcache('onlineInfo.modifyMandatory')"
        :visible="visible"
        :dialog-style="{ top: '20px' }"
        :width="1000"
        :okText="$tcache('common.save')"
        :cancelText="$tcache('common.cancel')"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <station_detail :data="record" :typeName="'edit'" :processes="processes" :steps="steps" :parks="parks" :groups="groups"
       :nextCacheStations="nextCacheStations" :stations="stationsData" :alldata="alldata" :nextDecidePoints="nextDecidePoints"/>
    </a-modal>
  </div>
</template>

<script>
import onlineInfo from "../language/zh-CN/pages/onlineInfo";
import station_detail from "./admin/station_detail.vue"
export default {
  name: "OnlineInfo",
  data() {
    return {
      show_data:[
        {type:'agv',icon:'shopping',text:this.$tcache("onlineInfo.agvOnlineStatus"),online:undefined,offline:undefined,total:undefined},
        {type:'station',icon:'bar-chart',text:this.$tcache("onlineInfo.machineOnlineStatus"),online:undefined,offline:undefined,total:undefined},
        {type:'anomaly',icon:'user-add',text:this.$tcache("onlineInfo.abnormalEquipment"),online:0,offline:0,total:0},
        {type:'qtime',icon:'pie-chart',text:this.$tcache("onlineInfo.inProcessQuantity"),online:0,offline:0,total:0},
      ],
      thekey: 0,
      noTitleKey: "all",
      tabListNoTitle: [
        {
          key: 'all',
          tab: this.$tcache("onlineInfo.whole"),
        }
      ],
      station_offline: '',//机台在线数量
      station_online: '',//机台离线数量
      timer_stationinfo: null,
      station_data:{},
      nextCacheStations:[],
      parks:[],
      record:{},
      alldata:[],
      stationIndex:'',
      selectedStation:{},
      visible:false,
      processes:[],
      steps:[],
      stationsData:[],
      editClose:false,
      isAdmin:this.$store.state.isAdmin,//判断是否为管理员
      editable:localStorage.getItem('RoleMenu').includes('/admin_station_editable'),//验证当前页面是否可编辑
      nextDecidePoints:[],
      firstCycle:true,
      groups:this.$store.state.groups
    }
  },
  mounted() {
    this.queryParks()
    this.queryProcess()
    this.querySteps();
    
  },
  components:{
    station_detail,
  },
  beforeDestroy() {
    clearInterval(this.timer_stationinfo)
  },
  methods: {
    changeEnabled(record,key,k){
      console.log(record,key,k)
      this.editClose=true
      this.axios.put(`station/enabled/${record.id}/${!record.enabled}`).then(()=>{
        record.enabled=!record.enabled
        this.$set(this.station_data[key],k,record)
        this.editClose=false
      }).catch(()=>{})
    },
    getStationName(key) {
      let keyName = ""
      for(const item of this.tabListNoTitle) {
        if(key == item.key) {
          keyName = item.tab;
          break;
        }
      }
      return keyName
    },
    onTabChange(key) {
      this.thekey = key
      this.noTitleKey= key;
      console.log(key, this.noTitleKey);
    },
    querySteps() {
      this.axios.get(`step/all`).then(data => {
        if (Array.isArray(data.data)) {
          this.steps=data.data
          data.data.forEach(e => {
            this.tabListNoTitle.push({ key: e.id + '', tab: e.name })
          });
          this.queryStation()
        } else { this.$message.info(this.$tcache(onlineInfo.stepIncorrect)) }
      }).catch(err => { this.$message.error(this.$tcache(onlineInfo.stepAcquisitionFailed) + err) })
    },
    queryStation() {
      this.axios.get(`station/all`).then(res => {
        if (res.status == 200 && res.data) {
          this.alldata=[...res.data]
          res.data.forEach(item => {
            item['offline']=true
          })
          this.queryStationinfo(res.data.sort((a, b) => { return a.id - b.id }))
        } else {
          this.$message.warning(this.$tcache(onlineInfo.machineDockingInfoQueryFailed))
        }
      }).catch(() => { this.$message.warning(this.$tcache(onlineInfo.machineDockingInfoQueryFailed)) })
    },
    queryStationinfo(alldata) {
      this.axios.get(`cache/stationinfo/list`).then(res => {
        if (res.status == 200 && res.data) {
          // let now=Date.now()
          res.data.forEach(item => {
            let index =alldata.findIndex(e=>e.id==item.id)
            // console.log(index)
            let index2 = this.station_data[alldata[index].step]?.findIndex(e=>e.id==item.id)
            // console.log(index2,this.station_data[alldata[index].step][index2].ts)
            if(index>=0){
              // console.log('延迟(秒)==>',(now-item.ts)/1000,now,item.ts)
              if(this.station_data[alldata[index].step])console.log(index2,this.station_data[alldata[index].step][index2].ts)
              if(this.station_data[alldata[index].step]&&item.ts>this.station_data[alldata[index].step][index2].ts){
                console.log(index2,this.station_data[alldata[index].step][index2].ts)
                alldata[index].offline = false
              }
              alldata[index].controlState = item.controlState
              alldata[index].inNum = item.inNum
              alldata[index].outNum = item.outNum
              alldata[index].ts = item.ts
            }
          })
          let offnum=alldata.filter(item => item.offline == true).length
          let onnum=alldata.filter(item => item.offline == false).length
          if(this.station_offline!=offnum||this.station_online!=onnum){
            this.station_offline = alldata.filter(item => item.offline == true)?.length
            this.station_online = alldata.length-this.station_offline
              //栏目展示数据机台
            if(this.show_data[1].type=="station"){
              this.show_data[1].online=this.station_online
              this.show_data[1].offline=this.station_offline
              this.show_data[1].total=this.show_data[1].online+this.show_data[1].offline
            }
          }
          const data = this.groupStationDate(alldata);
          this.station_data = data;
          if(this.firstCycle){
            setTimeout(()=>{this.queryStation();},1000)
            this.firstCycle = false;
            return;
          }
          if(this.timer_stationinfo){
            clearTimeout(this.timer_stationinfo)
          }
          this.timer_stationinfo = setTimeout(() => { this.queryStation() }, 5000)
        }
      })
    },
    groupStationDate(stationList) {
      let result = {};
      stationList.forEach((item)=>{
        if(!result[item.step]) result[item.step] = [];
        result[item.step].push(item);
      })
      return result;
    },
    queryNextCacheStations(){
      this.axios.get(`station/all`).then(res=>{
        this.nextCacheStations=res.data.filter(s=>s.stationType==2||s.stationType==3)
      })
    },
    queryParks(){
      this.axios.get(`point/bytype/PARK`).then(data=>{
        this.parks =data.data
      })
    },
    getNextStation(nextStep){
      this.axios.get(`station/bystep/${nextStep}`).then(res=>{
        if(res.status == 200&&res.data){
          this.stationsData=res.data
        }else{
          this.$message.warning(this.$tcache(onlineInfo.nextMachineQueryFailed))
        }
      }).catch(()=>{this.$message.warning(this.$tcache(onlineInfo.nextMachineQueryFailed))})
    },
    queryProcess(){
      this.axios.get(`dict/process`).then(data=>{
        this.processes =data.data
      })
    },
    queryDecidePoints(nextStep){
      this.axios.get(`point/type/DECIDE/step/${nextStep}`).then(data=>{
        this.nextDecidePoints =data.data
      })
    },
    recordEdit(record,key,k){
      if(this.editable||this.isAdmin){
        if(this.editClose){return}
        console.log(record)
        this.queryDecidePoints(record.nextStep)
        this.selectedStation=this.station_data[key][k]
        this.stationIndex=k
        let nextCacheStations=record.nextCacheStations
        if((nextCacheStations??'')!=''&&typeof nextCacheStations!=='object'){
          record.nextCacheStations=nextCacheStations.split(',').map(n=>Number(n))
        }
        let parks=record.parks
        if((parks??'')!=''&&typeof parks!=='object'){
          record.parks=parks.split(',').map(n=>Number(n))
        }
        this.queryNextCacheStations()
        if(!record.parks){record.parks=''}
        record.nextStations=record.nextStations?record.nextStations:undefined;
        record.parks=record.parks?record.parks:undefined;
        record.nextCacheStations=record.nextCacheStations?record.nextCacheStations:undefined;
        record.nextOutBasketStation=record.nextOutBasketStation?record.nextOutBasketStation.split(',').map(n=>Number(n)):undefined;
        this.record=record
        this.visible= true
        let nt=record.nextStep?record.nextStep:''
        this.getNextStation(nt)
      }
    },
    handleOk(){
      let state=false
      let requierdstr=''
      let requierds=['line','name','process','step','nextStep','relPids','exitPoint','doPoint']
      let obj=this.record
      requierds.forEach(r=>{
        if(((obj[r]??'')==''||obj[r]?.length==0)&&obj[r]!==0&&obj[r]!=='0'){
          requierdstr+='-'+r+'-'
          state=true
        }
      })
      if(state){
        this.$message.info(this.$tcache('onlineInfo.required')+`(${requierdstr})`+this.$tcache('onlineInfo.notEmpty'))
        return
      }
      let that = this
      this.$confirm({
        title: this.$tcache('common.prompt'),
        content:this.$tcache('common.pressOkSave'),
        onOk(){
          that.save();that.visible = false
        },
      })
    },
    handleCancel(){
      // this.isSave=false
      this.record={}
      this.visible = false
      // this.saveId=record.id
      // this.queryData()
    },
    dealt(value,key){
      if(Array.isArray(value)){
        if(value.length==0){
          value=null;
          this.record[key]=value;
        }else{
          value=[...new Set(value.join(',').split(','))].join(',')
          this.record[key]=value;
        }
      }
    },
    save(){
      // this.dealt(this.record.nextStations,"nextStations")
      this.dealt(this.record.parks,"parks")
      this.dealt(this.record.nextCacheStations,"nextCacheStations")
      if((!this.record.parks)&&this.record.parks!='0')this.record.parks=null
      if((!this.record.nextCacheStations)&&this.record.nextCacheStations!='0')this.record.nextCacheStations=null
      if(!this.record.chargerLimits&&this.record.chargerLimits!=0)this.record.chargerLimits=null
      let obj={...this.record}
      this.axios.post(`station/save`, obj).then(res=>{
        if(res.status == 200){
          this.$set(this.station_data[this.record.step],this.stationIndex,this.selectedStation)
        }else{
          this.$message.warning(this.$tcache('common.saveFail'))
        }
      }).catch(err=>{this.$message.error(err)})
    },
  }
}
</script>

<style lang="scss" scoped>
  .span1, .span2 {
    display: inline-block;
    height: 16px;
    background: #36ab36;
    width: 16px;
    border-radius: 50%;
  }
  .span2 {
    background: #e96666;
  }
  .span3, .span4 {
    width: 50px;
    height: 20px;
    display: inline-block;
    background: #8b8b81;
    color: white;
    border-radius: 5px;
  }
  .span4 {
    background: #93c94d;
  }
  .online-info{
    .top-status-info{
      display: flex;
      max-width: 560px;
      justify-content: space-between;
      .span-wrapper{
        display: flex;
        align-items: center;
        font-size: 16px;
        span{
          margin-right: 6px;
        }
      }
      
    }
    .online-info-content{
      padding-top: 20px;
      .station-content{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .group-wrapper{
          width: 48%;
          padding-bottom: 20px;
          margin-bottom: 10px;
          background: #d0e0e9;
          display: flex;
          flex-direction: column;
          align-items: center;
          // justify-content: space-between;
          .group-title{
            width: 100%;
            border-bottom: 1px solid #ffffff;
            text-align: center;
            padding: 4px 0px;
          }
        }
        .group-wrapper:nth-child(2n) {
          margin-left: 2%;
          background:#bbc1f5;
        }
        .single-group{
          width: 100%;
          .single-group-list{
            float: left;
            padding: 0px 20px;
          }
        }
      }
    }
  }

  /** 修改外部组件tbas样式 start */
    ::v-deep .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
      text-align: center;
    }
   /** 修改外部组件tbas样式 end */
::v-deep .ant-card-grid{
  width: 100%;
}
::v-deep .single-group-list{
  width: 100%;
}
</style>