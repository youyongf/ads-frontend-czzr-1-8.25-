<template>
  <a-form-model  layout="inline" :form="data">
    <div class="flex">
      <a-form-model-item class="flex_item Width_350" :label="$tcache('admin.nextMachine')+'1'">
        <a-select v-model="data.nextStations1"  class="changeWidth" mode="multiple" :token-separators="[',']" :allow-clear="true" >
          <a-select-option v-for="item in stations" :key="item.id" :value="item.doPoint">{{item.group|fmtGroup}}-{{item.name}}</a-select-option>
        </a-select>
        <div class="parks groupBox">
          <a-select v-model="group1" @deselect="deselect1" class="group" mode="multiple" :placeholder="'按'+$t('common.group')+'选'" :options="groups" />
        </div>
      </a-form-model-item>
      <a-form-model-item class="flex_item Width_350" :label="$tcache('admin.nextMachine')+'2'">
        <a-select :disabled="data.nextStations1.length==0&&data.nextStations2.length==0" v-model="data.nextStations2"  class="changeWidth" mode="multiple" :token-separators="[',']" :allow-clear="true" >
          <a-select-option v-for="item in stations" :key="item.id" :value="item.doPoint">{{item.group|fmtGroup}}-{{item.name}}</a-select-option>
        </a-select>
        <div class="parks groupBox">
          <a-select v-model="group2" @deselect="deselect2" class="group" mode="multiple" :placeholder="'按'+$t('common.group')+'选'" :options="groups" />
        </div>
      </a-form-model-item>
      <a-form-model-item  class="flex_item Width_350" :label="$tcache('admin.stationDet15')">
        <a-input  class="changeWidth"  v-model.number="data.alternateGroups" :placeholder="$tcache('admin.stationDet15')" />
      </a-form-model-item>
      <a-form-model-item  class="flex_item Width_350" :label="$tcache('admin.stationDet07')">
        <a-select v-show="showAllParks" v-model="data.parks"  class="changeWidth" mode="multiple" :token-separators="[',']" :allow-clear="true">
          <a-select-option class="" v-for="item in parks" :key="item.id" :value="item.id">{{item.step|fmtStep}}-{{item.area}}-{{item.remark}}</a-select-option>
        </a-select>
        <a-select v-show="!showAllParks" v-model="data.parks"  class="changeWidth" mode="multiple" :token-separators="[',']" :allow-clear="true">
          <a-select-option class="" v-for="item in parksByNextStep" :key="item.id" :value="item.id">{{item.step|fmtStep}}-{{item.area}}-{{item.remark}}</a-select-option>
        </a-select>
        <div class="parks"><a-checkbox v-model="showAllParks">全部</a-checkbox></div>
      </a-form-model-item>
    </div>
  </a-form-model>
</template>

<script>
let vueApp=null;
export default {
  name: "station_detail",
  props:{
    data: {type:Object, required:true},
    processes: {type:Array, required: false},
    steps: {type:Array, required: false},
    stations: {type:Array, required: false},
    parks: {type:Array, required: false,default:()=>[]},
    nextDecidePoints: {type:Array, required:false,default:()=>[]},
    alldata: {type:Array, required: false},
    groups: {type:Array, required: false},
    num: {type:Number, required: false},
  },
  data(){
    return{
      chargerLimits:[
        {second:0,units:this.$tcache('admin.stationDet22')},{second:1,units:this.$tcache('admin.stationDet22')},{second:2,units:this.$tcache('admin.stationDet22')},{second:3,units:this.$tcache('admin.stationDet22')},{second:4,units:this.$tcache('admin.stationDet22')},{second:5,units:this.$tcache('admin.stationDet22')},
        {second:6,units:this.$tcache('admin.stationDet22')},{second:7,units:this.$tcache('admin.stationDet22')},{second:8,units:this.$tcache('admin.stationDet22')},{second:9,units:this.$tcache('admin.stationDet22')},{second:10,units:this.$tcache('admin.stationDet22')},
      ],
      tr:true,
      fa:false,
      enabled:false,
      nextStations2:undefined,
      alld:[],
      stationNameSelected:'',
      stepsArr:[],
      areas:[1,2,3,4,5],
      areaRemark:[this.$tcache('admin.pointMap17'),this.$tcache('admin.pointMap18'),this.$tcache('admin.publicDet03'),this.$tcache('admin.publicDet04'),this.$tcache('admin.publicDet05')],
      railType:[{id:'U',name:this.$tcache('admin.cacheLayer05')},{id:'D',name:this.$tcache('admin.cacheLayer04')}],
      showAllParks:false,
      parksByNextStep:[],
      group1:undefined,
      group2:undefined,
    }
  },
  filters:{
    fmtStep:val=>{
      let steps = [...vueApp.steps]
      let step = steps.find(e=>e.id == val)
      if(step){
        return step.name
      }
      return val
    }
  },
  beforeCreate(){
    this.group1 = undefined;
    this.group2 = undefined;
  },
  watch:{
    alldata: {
      // 监听数据 获取到数据里的数组数据
      handler(val) {
        this.alld =val
      },
      deep: true, // 深度监听
      immediate:true, //当 watch 一个变量的时候，初始化时并不会执行你需要在created的时候手动调用一次。添加immediate属性，这样初始化的时候也会触发
    },
    steps: {
      // 监听数据 获取到数据里的数组数据
      handler(val) {
        console.log(val)
          this.stepsArr =val
      },
      deep: true, // 深度监听
      immediate:true, //当 watch 一个变量的时候，初始化时并不会执行你需要在created的时候手动调用一次。添加immediate属性，这样初始化的时候也会触发
    },
    data:{
      handler(n,o){
        console.log(n,o)
        this.parksByNextStep=this.parks.filter(p=>p.step===this.data.nextStep)
      },
      deep:true
    },
    'data.nextStations'(newV, oldV){
      console.log(newV,oldV)
    },
    group1(newV){
      console.log(newV)
      if(Array.isArray(this.stations)&&newV){
        let arr = this.stations.filter(s=>newV.includes(s.group)).map(d=>d.doPoint);
        this.data.nextStations1 = [...new Set([...this.data.nextStations1,...arr])]
      }
    },
    group2(newV){
      if(Array.isArray(this.stations&&newV)){
        let arr = this.stations.filter(s=>newV.includes(s.group)).map(d=>d.doPoint);
        this.data.nextStations2 = [...new Set([...this.data.nextStations2,...arr])]
      }
    },
    num(newV){
      console.log(newV)
      this.group1 = undefined;
      this.group2 = undefined;
    },
  },
  beforeMount(){
    vueApp=this
  },
  mounted(){
    this.parksByNextStep=this.parks.filter(p=>p.step===this.data.nextStep)
    console.log(this.parksByNextStep)
    this.areas=[...new Set(this.alldata.map(item=>item.area))]
    // let obj=this.data.nextStations2
    // if(obj){
    //   this.nextStations2=JSON.parse(JSON.stringify(obj))
    // }
  },
  methods:{
    deselect1(group){
      if(Array.isArray(this.stations)){
        let arr = this.stations.filter(s=>group==s.group).map(d=>d.doPoint);
        this.data.nextStations1 = this.data.nextStations1.filter(d=>!arr.includes(d))
      }
    },
    deselect2(group){
      if(Array.isArray(this.stations)){
        let arr = this.stations.filter(s=>group==s.group).map(d=>d.doPoint);
        this.data.nextStations2 = this.data.nextStations2.filter(d=>!arr.includes(d))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flex{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.wrap{
  flex-wrap: wrap;
}
.changeWidth{
  width: 200px;
}
.ant-select-selection__rendered{
  color: #706969;
}
::v-deep .ant-select-selection-selected-value{
  color: #706969;
}
.Width_350{
  // width: 350px;
  width: 460px;
}
::v-deep .ant-form-item-label{
  width: 120px;
  text-align: left;
}
.nextStationsCN{
  position: absolute;
  left: 0;
  top: -36px;
  z-index: 10;
  overflow: auto;
  height: 27px;
}
.col{
  display: inline-block;
  width: 120px;
  text-align: left;
  span{
    color: red;
    position: absolute;
    left: -10px;
  }
}
.flex_item{
  margin-right: 0;
}
::v-deep .ant-select-selection__rendered{
  margin-right: 0 !important;
}
.parks{
  position: absolute;
  z-index: 1;
  right: -70px;
  top: -10px;
}
.groupBox {
  width: 100px;
  right: -110px;
}
</style>