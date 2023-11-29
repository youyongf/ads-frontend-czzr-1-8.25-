<template>
  <div>
    <div style="margin: 10px">
      展示类型：
      <a-radio-group
        v-model="showType"
        @change="queryData"
        button-style="solid"
      >
        <a-radio-button v-for="t in typeOptions" :key="t.value" :value="t.value">
          {{ t.label }}
        </a-radio-button>
      </a-radio-group>
    </div>

    <div v-show="showType" style="width:100%;">
      <div v-for="g in groups" :key="g.value" :id="`main${g.value}`" style="height:500px;width:500px;"></div>
      <!-- <div id="main1" style="height:500px;width:500px;"></div>
      <div id="main2" style="height:500px;width:500px;"></div>
      <div id="main3" style="height:500px;width:500px;"></div>
      <div id="main4" style="height:500px;width:500px;"></div>
      <div id="main5" style="height:500px;width:500px;"></div>
      <div id="main6" style="height:500px;width:500px;"></div>
      <div id="main7" style="height:500px;width:500px;"></div>
      <div id="main8" style="height:500px;width:500px;"></div>
      <div id="main9" style="height:500px;width:500px;"></div>
      <div id="main10" style="height:500px;width:500px;"></div>
      <div id="main11" style="height:500px;width:500px;"></div>
      <div id="main12" style="height:500px;width:500px;"></div>
      <div id="main13" style="height:500px;width:500px;"></div>
      <div id="main14" style="height:500px;width:500px;"></div>
      <div id="main15" style="height:500px;width:500px;"></div>
      <div id="main16" style="height:500px;width:500px;"></div>
      <div id="main17" style="height:500px;width:500px;"></div>
      <div id="main18" style="height:500px;width:500px;"></div>
      <div id="main19" style="height:500px;width:500px;"></div>
      <div id="main20" style="height:500px;width:500px;"></div>
      <div id="main21" style="height:500px;width:500px;"></div> -->
    </div>

    <div v-show="!showType">
      <a-radio-group
        v-model="group"
        @change="chart(data[group], group, 'main')"
        button-style="solid"
      >
        <a-radio-button v-for="g in groups" :key="g.value" :value="g.value">
          {{ g.label }}
        </a-radio-button>
      </a-radio-group>
      <div id="main"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import filters from "@/filter/vuefilter";
export default {
  data() {
    return {
      dataObj: {},
      group: 1,
      groups: [],
      myChart: {},
      timer: null,
      showType: false,
      typeOptions:[
        {value:false,label:"单个"},
        {value:true,label:"全部"}
      ]
    };
  },
  created(){
    console.log(filters.getGroups());
    this.groups = filters.getGroups();
  },
  mounted() {
    this.queryData();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    queryData() {
      this.axios
        .get(`groupOnLineQtimeBaskVol`)
        .then((res) => {
          if (res.status == 200) {
            let dataObj = {};
            this.groups.forEach(g=>{
              dataObj[g.value] = []
            })
            console.log(dataObj)
            // this.data = res.data;
            res.data.forEach((item) => {
              if (dataObj[item.group]) {
                dataObj[item.group].push(item);
              } else {
                dataObj[item.group] = [];
                dataObj[item.group].push(item);
              }
              // dataObj[item.group].push(item);
            });
            console.log(this.myChart)
            if(Object.keys(this.myChart).length>0){
              Object.keys(this.myChart).forEach(k=>{
                if ((this.myChart[`${k}`] ?? "") !== "") {
                  this.myChart[`${k}`].dispose(); //销毁
                }
              })
            }
            console.log(dataObj)
            Object.keys(dataObj).forEach((key) => {
              dataObj[key] = dataObj[key].map((v) => {
                return { value: v.count, name: v.process };
              });
              // console.log(dataObj[key], key, `main${key}`)
              this.chart(dataObj[key], key, `main${key}`);
            });
            this.chart(dataObj[this.group], this.group, "main");
            this.data = dataObj
            if (this.timer) {
              clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
              this.queryData();
            }, 60000);
          }
        })
        .catch((err) => {
          this.$message.error(
            err,
            this.$tcache("check.failedInfoVehicleUnderPro")
          );
        });
    },
    chart(data, group, ID) {
      console.log(data, group, ID)
      var chartDom = document.getElementById(ID);
      console.log(data, group, ID)
      if(!chartDom){return;}
      this.myChart[ID] = echarts.init(chartDom);
      console.log(this.myChart)
      var option;

      option = {
        title: {
          text: `${filters.fmtGroup(Number(group))}`,
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: true,
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "车辆数",
            type: "pie",
            radius: "50%",
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              show: true, // 设置为 true 显示标签
              position: "outside", // 标签位置，可以设置为 'inside' 或 'outside'
              formatter: "{b}: {c}", // {b} 表示数据项的 name，{c} 表示数据项的 value
            },
          },
        ],
      };

      option && this.myChart[ID].setOption(option);
    },
    changeType() {
      this.queryData()
    },
  },
};
</script>

<style lang="scss" scoped>
// .flex {
//   display: flex;
//   justify-content: space-around;
//   flex-wrap: wrap;
//   position: relative;
//   .list {
//     width: 50%;
//   }
// }
// .rt0 {
//   position: absolute;
//   right: 15px;
//   top: -15px;
//   span {
//     color: #dd4a24;
//     font-weight: bold;
//   }
// }
#main {
  height: 500px;
  margin: 50px 0;
}
// #main1,#main2,#main3,#main4,#main5 {
//   height: 500px;
//   margin: 50px 0;
//   width: 100%;
// }
</style>
