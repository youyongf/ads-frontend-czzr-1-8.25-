<template>
  <a-form-model layout="inline" :form="data">
    <a-form-model-item v-show="!hidden.includes(k)&&!(type=='add'&&k=='id')" v-for="k in Object.keys(inputData)" :key="k"
     class="Width_350" :class="requireds.includes(k)?'require':''" :label="k|fmtColumns">
      <a-input :disabled="disabled[`${type}`]?.includes(k)" class="Width_200"  v-model="data[k]"/>
    </a-form-model-item>
    <a-form-model-item v-show="!hidden.includes(k)" v-for="k in Object.keys(isNumData)" :key="k"
     class="Width_350" :class="requireds.includes(k)?'require':''" :label="k|fmtColumns">
        <a-input :disabled="disabled[`${type}`]?.includes(k)" class="Width_200" type="number"  v-model.number="data[k]"/>
      </a-form-model-item>
    <a-form-model-item v-show="!hidden.includes(k)" v-for="k in Object.keys(radioData)" :key="k" class="Width_350" :class="requireds.includes(k)?'require':''" :label="k|fmtColumns">
      <a-select :disabled="disabled[`${type}`]?.includes(k)" class="Width_200" v-model="data[k]" :options="radios[k]"  :allow-clear="true"/>
    </a-form-model-item>
    <a-form-model-item v-show="!hidden.includes(k)" v-for="k in Object.keys(checkboxData)" :key="k" class="Width_350" :class="requireds.includes(k)?'require':''" :label="k|fmtColumns">
      <a-select :disabled="disabled[`${type}`]?.includes(k)" class="Width_200" v-model="data[k]" mode="multiple" :token-separators="[',']" :allow-clear="true" :options="checkboxs[k]"/>
      <div class="parks groupBox" v-if="k=='nextStations1'||k=='nextStations2'">
        <a-select v-if="k=='nextStations1'" v-model="group1" @deselect="deselect1" class="group" mode="multiple" :placeholder="'按'+$t('common.group')+'选'" :options="groups" />
        <a-select v-if="k=='nextStations2'" v-model="group2" @deselect="deselect2" class="group" mode="multiple" :placeholder="'按'+$t('common.group')+'选'" :options="groups" />
      </div>
    </a-form-model-item>
    <a-form-model-item v-show="!hidden.includes(k)" v-for="k in Object.keys(bolData)" :key="k" class="Width_350" :class="requireds.includes(k)?'require':''" :label="k|fmtColumns">
      <a-switch v-model.number="data[k]"  :checked-children="$tcache('onlineInfo.open')" :un-checked-children="$tcache('onlineInfo.close')" />
    </a-form-model-item>
  </a-form-model>
</template>

<script>
let vueApp=null;
export default {
  name: "agv_detail",
  props:{
    data: {type:Object, required:true},
    columns: {type:Array, required: true},
    radio: {type:Array, required: false,default:()=>[]},
    checkbox: {type:Array, required: false,default:()=>[]},
    bol: {type:Array, required: false,default:()=>[]},
    radios: {type:Object, required:false,default:()=>{}},
    checkboxs: {type:Object, required:false,default:()=>{}},
    disabled: {type:Object, required: false,default:()=>{return {edit:[],add:[]}}},
    isNum: {type:Array, required:false,default:()=>[]},
    requireds: {type:Array, required:false,default:()=>[]},
    type: {type:String, required: false},
    hidden: {type:Array, required: false,default:()=>[]},
    groups: {type:Array, required: false},
    num: {type:Number, required: false},
  },
  data(){
    return{
      inputData:{},
      radioData:{},
      checkboxData:{},
      isNumData:{},
      bolData:{},
      group1:undefined,
      group2:undefined,
    }
  },
  created(){
    vueApp=this
    Object.keys(this.data).forEach(k=>{
      if(this.radio.includes(k)){
        this.radioData[k]=this.data[k]
      }else if(this.checkbox.includes(k)){
        this.checkboxData[k]=this.data[k]
      }else if(this.isNum.includes(k)){
        this.isNumData[k]=this.data[k]
      }else if(this.bol.includes(k)){
        this.bolData[k]=this.data[k]
      }else{
        this.inputData[k]=this.data[k]
      }
    })
    console.log(this.data,this.checkboxs['stations'])
  },
  watch:{
    group1(newV){
      console.log(newV,this.checkboxs['stations'])
      if(Array.isArray(this.checkboxs['stations'])&&newV){
        let arr = this.checkboxs['stations'].filter(s=>newV.includes(s.value)).map(d=>d.doPoint);
        console.log(arr)
        this.data.nextStations1 = [...new Set([...this.data.nextStations1,...arr])]
        console.log(this.data.nextStations1)
      }
    },
    group2(newV){
      if(Array.isArray(this.checkboxs['stations']&&newV)){
        let arr = this.checkboxs['stations'].filter(s=>newV.includes(s.value)).map(d=>d.doPoint);
        this.data.nextStations2 = [...new Set([...this.data.nextStations2,...arr])]
      }
    },
    num(newV){
      console.log(newV)
      this.group1 = undefined;
      this.group2 = undefined;
      // Object.keys(this.data).forEach(key=>{
      //   if(key!='id')this.data[key] = undefined;
      // })
    }
  },
  filters:{
    fmtColumns(val){
      let cols=[...vueApp.columns]
      let col=cols.find(c=>c.key==val)
      if(col){
        return col.title
      }
      return val
    },
  },
  methods:{
    deselect1(group){
      console.log(group,this.checkboxs['stations'],this.data.nextStations1)
      if(Array.isArray(this.checkboxs['stations'])){
        let arr = this.checkboxs['stations'].filter(s=>group==s.value).map(d=>d.doPoint);
        console.log(arr)
        this.data.nextStations1 = this.data.nextStations1.filter(d=>!arr.includes(d))
      }
    },
    deselect2(group){
      if(Array.isArray(this.checkboxs['stations'])){
        let arr = this.checkboxs['stations'].filter(s=>group==s.value).map(d=>d.doPoint);
        this.data.nextStations2 = this.data.nextStations2.filter(d=>!arr.includes(d))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .ant-form-item-label{
  width: 150px;
  text-align: left;
}
::v-deep .ant-modal-body{
  text-align: center;
}
.require::before{
  content: '*';
  font-weight: bold;
  position: absolute;
  left: -10px;
  line-height: 40px;
  color: red;
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