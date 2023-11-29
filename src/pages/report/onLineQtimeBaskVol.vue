<template>
  <div>
    <!-- <a-button ref="audioButton" @click="toggleAudio" class="butt">
      {{ isPlaying ? '暂停' : '播放' }}
      </a-button> -->
       <!-- <audio controls ref="audio" class="aud" loop :autoplay="true" ><source type="audio/mpeg" src="/warning.mp3" /></audio> -->
    <div class="refreshTime">
      <span class="ti">{{ $tcache("report.autoRefreshTime") }}：</span>
      <a-input-search
        v-model.number="refreshTime"
        type="number"
        placeholder="input search text"
        enter-button="保存"
        size="large"
        @search="saveRef"
        style="max-width: 200px; margin-bottom: 5px"
      />
      <!-- <span class="ti">警报解除时间(分钟)：</span>
      <a-input-search
        v-model.number="warningTimes"
        type="number"
        placeholder="input search text"
        enter-button="保存"
        size="large"
        @search="saveWarn"
        style="max-width: 200px; margin-bottom: 5px"
      /> -->
      <!-- <a-button :disabled="!record.warning" type="danger" ghost @click="closeWarning(record,index)">{{record.warning?'警报解除':'正常'}}</a-button> -->
    </div>
    <a-row>
      <a-table
        :row-class-name="
          (record, index) => (index % 2 === 1 ? 'table-striped' : null)
        "
        :dataSource="data"
        :columns="columns"
        rowKey="item"
        size="small"
      >
      <div slot="operate" slot-scope="text,record,index">
        <a-button :disabled="!record.warning" type="danger" ghost @click="closeWarning(record,index)">{{record.warning?'警报解除':'正常'}}</a-button>
      </div>
      </a-table>
    </a-row>
    <h2>{{ $tcache("report.realTimeProMap") }}</h2>
    <div id="main"></div>
  </div>
</template>
<script>
import groupsColors from "@/data/groups_colors.json";
import * as echarts from "echarts";
import filters from "@/filter/vuefilter";
const tableData = require("../../data/columns_onLineQitemBaskVol.json");
export default {
  data() {
    return {
      data: [],
      chartData: {},
      colors: [
        {
          text: this.$tcache("report.cachingProgress"),
          color: "#f5ce87",
          sign: "cache_amount",
        },
        {
          text: this.$tcache("report.machTransProgress"),
          color: "#30931e",
          sign: "agv_transfer_amount",
        },
        {
          text: this.$tcache("report.driveStatusControl"),
          color: "#93e673",
          sign: "agv_steer_amount",
        },
        {
          text: this.$tcache("report.standbyPointControl"),
          color: "#569f8f",
          sign: "agv_park_amount",
        },
        {
          text: this.$tcache("report.numberEmptyCars"),
          color: "#88b13e",
          sign: "empty_qty",
        },
        {
          text: this.$tcache("report.numberCars"),
          color: "#5c7bd9",
          sign: "agv_qty",
        },
      ],
      color_show: false,
      colors_groups: groupsColors,
      splitNumber: 5,
      piecesMaxValue: 420000,
      vehiclesMaxValue: 12000,
      theobj: {},
      refreshTime: localStorage.getItem("refreshTime")?Number(localStorage.getItem("refreshTime")):60,
      checked: true,
      myChart: null,
      series: [],
      columns: [],
      groups: [],
      alertAudio: null,
      timeout: null,
      isWarning:{},
      timerWarning:{},
      warningTimes:localStorage.getItem("warningTimes")?Number(localStorage.getItem("warningTimes")):10,
      isPlaying:false
    };
  },
  // computed: {
  //     columns() {
  //         console.log(tableData)
  //         return this.$transformI18n(tableData, "title");
  //     },
  // },
  created() {
    
  },
  mounted() {
    // this.alertAudio = new Audio('/warning.mp3');
    // this.alertAudio.loop = true;
    this.groups = filters.getGroups().map((g) => g.label);
    this.queryData();
    // this.$refs.audio.click()
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer);
    window.removeEventListener("resize", this.resizefun);
    // this.alertAudio.pause();
    // this.alertAudio.currentTime = 0;
    // if(this.timerWarning){
    //   Object.keys(this.timerWarning).forEach(key=>{
    //     if(this.timerWarning[key])clearTimeout(this.timerWarning[key])
    //   })
    // }
  },
  methods: {
    // toggleAudio() {
    //   this.isPlaying = !this.isPlaying;
    //   if(this.isPlaying){
    //     console.log(this.$refs.audio.play())
    //       this.$refs.audio.play();
    //   }else{
    //     this.$refs.audio.pause();
    //     this.$refs.audio.currentTime = 0;
    //   }
    // },
    // openAudio(){
    //   if(this.alertAudio){
    //     this.alertAudio.pause();
    //     this.alertAudio.currentTime = 0;
    //     this.alertAudio.play()
    //   }
    // },
    saveRef(){
      localStorage.setItem("refreshTime",this.refreshTime)
      this.$message.success("保存成功");
      this.queryData()
    },
    saveWarn(){
      localStorage.setItem("warningTimes",this.warningTimes)
      this.$message.success("保存成功");
    },
    closeWarning(record,index){
      console.log(record,index)
      if(this.timerWarning[record.process]){
        clearTimeout(this.timerWarning[record.process]);
      }
      console.log(this.isWarning)
      this.isWarning[record.process] = false;
      console.log(this.isWarning)
      // Object.assign(this.isWarning[record.process],false)
      // this.$set(this.isWarning,record.process,false)
      this.timerWarning[record.process] = setTimeout(()=>{
        this.isWarning[record.process] = true;
      },this.warningTimes*60000)
      // this.alertAudio.pause();
      // this.alertAudio.currentTime = 0;
      console.log(this.timerWarning)
      this.alertAudio.pause();
      this.alertAudio.currentTime = 0;
      // if(!Object.values(this.isWarning).includes(true)){
      //   this.alertAudio.pause();
      //   this.alertAudio.currentTime = 0;
      //   console.log(this.alertAudio)
      // }
      this.$message.success(`警报已暂时解除`)
    },
    queryGroups() {
      const _this = this;
      this.axios
        .get(`groupOnLineQtimeBaskVol`)
        .then((res) => {
          if (res.status == 200) {
            let dataObj = {};
            let pobj = {};
            res.data.forEach((item) => {
              if (dataObj[item.group]) {
                dataObj[item.group].push(item);
              } else {
                dataObj[item.group] = [];
                dataObj[item.group].push(item);
              }
              if (pobj[item.process]) {
                pobj[item.process].push(item);
              } else {
                pobj[item.process] = [];
                pobj[item.process].push(item);
              }
            });
            Object.keys(dataObj).forEach((key) => {
              let arr = [];
              this.chartData.xAxis.forEach((p) => {
                let d = dataObj[key].find((t) => t.process == p);
                arr.push(d);
              });
              dataObj[key] = arr.map((d) => d.agvAmount);
              this.series.push({
                name: filters.fmtGroup(key),
                type: "bar",
                stack: "group",
                label: {
                  show: true,
                },
                emphasis: {
                  focus: "series",
                },
                tooltip: {
                  valueFormatter: function (value) {
                    return value + " " + _this.$tcache("report.piece");
                  },
                },
                itemStyle: { color: this.colors_groups[key % 30] },
                data: dataObj[key] ? dataObj[key] : [],
              });
            });
            Object.keys(pobj).forEach((k) => {
              let arr = pobj[k].map((e) => {
                return { [`${e.name}`]: e.agvAmount };
              });
              pobj[k] = arr.reduce((previousValue, currentValue) => {
                return { ...previousValue, ...currentValue };
              });
              let index = this.data.findIndex((d) => d.process == k);
              this.data[index] = { ...this.data[index], ...pobj[k] };
            });

            let tab = [];
            console.log(this.data[0],this.groups)
            Object.keys(this.data[0]).forEach((k) => {
              if (this.groups.includes(k)) {
                tab.push({ title: k, key: k, dataIndex: k });
              }
            });

            let coldata = [...tableData, ...tab];
            console.log(coldata);
            this.columns = this.$transformI18n(coldata, "title");
            setTimeout(() => {
              window.requestAnimationFrame(this.chart);
            }, 0);
            this.color_show = true;
          }
        })
        .catch((err) => {
          this.$message.error(
            err,
            this.$tcache("check.failedInfoVehicleUnderPro")
          );
        });
    },
    queryData() {
      const _this = this;
      this.color_show = false;
      this.axios
        .get(`onLineQtimeBaskVol`)
        .then((res) => {
          if (res.status == 200 && res.data?.length !== 0) {
            this.data = res.data;
            this.chartData = {
              cache_amount: [],
              agv_transfer_amount: [],
              agv_steer_amount: [],
              agv_park_amount: [],
              empty_qty: [],
              xAxis: [],
            };
            this.series = [];
            // let warningMsg = [];
            this.data.forEach((d) => {
              Object.keys(this.chartData).forEach((key) => {
                if (key == "xAxis") {
                  this.chartData[key].push({
                    process: d.process,
                    stepid: d.item,
                  });
                } else {
                  this.chartData[key].push({
                    [`${key}`]: d[key],
                    stepid: d.item,
                    process: d.process,
                  });
                }
              });
              // if(d.warning && typeof this.isWarning[d.process]!=="boolean"){
              //   this.isWarning[d.process] = true;
              //   warningMsg.push(d.message);
              // }
            });
            // if(Object.values(this.isWarning).includes(true)){
            //   console.log(this.alertAudio)
            //   this.openAudio()
            // }
            Object.keys(this.chartData).forEach((key) => {
              if (key == "xAxis") {
                this.chartData[key] = this.chartData[key]
                  .sort((a, b) => {
                    return a.stepid - b.stepid;
                  })
                  .map((x) => {
                    return x.process;
                  });
              } else {
                this.chartData[key] = this.chartData[key]
                  .sort((a, b) => {
                    return a.stepid - b.stepid;
                  })
                  .map((x) => {
                    return x[key];
                  });
                if (key == "agv_qty") {
                  this.series.push({
                    name: this.colors.find((c) => c.sign == key).text,
                    type: "bar",
                    label: {
                      show: true,
                    },
                    smooth: true,
                    yAxisIndex: 1,
                    tooltip: {
                      valueFormatter: function (value) {
                        return value + " " + _this.$tcache("report.cars");
                      },
                    },
                    itemStyle: {
                      color: this.colors.find((c) => c.sign == key).color,
                    },
                    data: this.chartData[key] ? this.chartData[key] : [],
                  });
                } else {
                  this.series.push({
                    name: this.colors.find((c) => c.sign == key).text,
                    type: "bar",
                    stack: "total",
                    label: {
                      show: true,
                    },
                    emphasis: {
                      focus: "series",
                    },
                    tooltip: {
                      valueFormatter: function (value) {
                        return key == "empty_qty"
                          ? value
                          : value + " " + _this.$tcache("report.piece");
                      },
                    },
                    itemStyle: {
                      color: this.colors.find((c) => c.sign == key).color,
                    },
                    data: this.chartData[key] ? this.chartData[key] : [],
                  });
                }
              }
            });
            console.log("this.data==>", this.data);
            this.queryGroups();
            // this.setMaxValue();
            // setTimeout(() => {
            //     window.requestAnimationFrame(this.chart);
            // }, 0)
            // this.color_show=true
          } else {
            this.$message.warning(this.$tcache("report.infoCheckIsEmpty"));
          }
        })
        .catch((err) => {
          this.$message.error(err + "");
        });
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.queryData();
      }, this.refreshTime * 1000);
    },
    /**
     * 设置最大片数和车数值
     */
    setMaxValue() {
      const agv_transfer_amount = this.chartData.agv_transfer_amount || [];
      const agv_steer_amount = this.chartData.agv_steer_amount || [];
      const agv_park_amount = this.chartData.agv_park_amount || [];
      const empty_qty = this.chartData.empty_qty || [];
      const cache_amount = this.chartData.cache_amount || [];
      let countList = [];
      agv_transfer_amount.forEach((item, index) => {
        const count =
          item +
          agv_steer_amount[index] +
          agv_park_amount[index] +
          empty_qty[index] +
          cache_amount[index];
        countList.push(count);
      });
      const piecesMaxValue = Math.max(...countList);
      const vehiclesMaxValue = Math.max(...this.chartData.agv_qty);
      this.piecesMaxValue = this.getStandardMaxVal(
        piecesMaxValue,
        this.splitNumber
      );
      this.vehiclesMaxValue = this.getStandardMaxVal(
        vehiclesMaxValue,
        this.splitNumber
      );
    },
    /**
     * 获取标准最大值
     * @param { number } maxValue -原始最大值
     * @param { number } splitNumber -份数
     * @returns { number } 标准最大值 能被份数整除，并且大于原始最大值
     */
    getStandardMaxVal(maxValue, splitNumber) {
      const average = Math.ceil(maxValue / splitNumber);
      return (splitNumber + 1) * average;
    },
    //柱状图
    chart() {
      if ((this.myChart ?? "") !== "") {
        this.myChart.dispose(); //销毁
      }
      // const _this = this;
      var chartDom = document.getElementById("main");
      this.myChart = echarts.init(chartDom);
      var option;
      let legendData = this.series.map((s) => s.name);

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          data: legendData, // 图例项的名称
          align: "left", // 图例水平对齐方式
          left: 10, // 图例距离左边的距离
          textStyle: {
            color: "#333", // 图例项文本颜色
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        // yAxis: {
        //     type: 'value'
        // },
        yAxis: [
          {
            type: "value",
            name: this.$tcache("report.inPro"),
            // max: 420000,
            //   max: this.piecesMaxValue,
            // interval: 420000 / 5,
            //   interval: this.piecesMaxValue / (this.splitNumber+1),
            axisLabel: {
              formatter: "{value} " + this.$tcache("report.piece"),
            },
          },
          // {
          //   type: 'value',
          //   name: this.$tcache("report.numberCars"),
          //   // max:12000,
          // //   max: this.vehiclesMaxValue,
          //   // interval: 12000 / 5,
          // //   interval: this.vehiclesMaxValue / (this.splitNumber+1),
          //   axisLabel: {
          //     formatter: '{value} '+this.$tcache("report.cars")
          //   }
          // }
        ],
        xAxis: {
          type: "category",
          data: this.chartData.xAxis ? this.chartData.xAxis : [],
          // data:['q','w','e','r','t',]
        },
        series: this.series,
      };
      this.myChart.setOption(option);
      // 根据页面大小自动响应图表大小
      window.addEventListener("resize", this.resizefun);
    },
    resizefun() {
      this.myChart.resize();
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .table-striped {
  background-color: #f0f0f0;
}

.mr {
  margin-right: 10px;
}

#main {
  max-height: 500px;
  // max-height: 400px;
  height: 500px;
}

.colors {
  display: flex;
  padding: 10px 0;

  .lis {
    display: flex;
    align-items: center;
    margin-right: 10px;

    div {
      width: 40px;
      height: 20px;
      border-radius: 5px;
      margin-right: 5px;
    }
  }
}
.flex {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.carnum {
  margin-left: 20px;
}
::v-deep .ant-table-thead > tr > th,
::v-deep .ant-table-tbody > tr > td {
  text-align: center;
}

::v-deep .ant-table-body {
  overflow: auto;
  margin: 0 !important;
}
::v-deep .ant-table-tbody > tr > td,
::v-deep .ant-table-header-column {
  white-space: nowrap;
}
.refreshTime{
  display: flex;
  justify-content: center;
  align-items: center;
  .ti{
    color: #5099bc; font-weight: bold; font-size: 15px;
    margin: 0 0 0 10px;
  }
}


.butt {
 
  font-size: 60px;
 
  width: 300px;
 
  height: 200px;
 
  border-radius: 10px;
 
  border-color: rgb(127, 204, 204);
 
}
 
.butt:hover {
 
  background: yellow;
 
}
</style>