<template>
  <div class="login">
    <div class="top">
      <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
    </div>
    <div class="bottom">
      <div class="tab">
        <div
          class="item"
          :class="[tabIndex == index && 'active']"
          v-for="(item,index) in list"
          :key="index"
          @click="tab(index)"
        >
          <span>{{item.name}}</span>
          <div class="xian"></div>
        </div>
      </div>
      <div class="duihuan" v-if="tabIndex==0">
        <div class="content">
          <div class="left">
            <div class="top">UDB通证</div>
            <div class="bottom">888.00</div>
          </div>
          <div class="right">
            <div class="open df" @click="open(0)">解仓</div>
            <div class="open df" @click="open(1)">锁仓</div>
          </div>
        </div>
      </div>
      <div class="note" v-if="tabIndex==1">
        <div class="tabs">
          <div class="item df" v-for="(item,index) in noteTab" :key="index">{{item.name}}</div>
        </div>
        <div class="content">
          <div class="item" v-for="(item,index) in noteList" :key="index">
            <div style="color:#F90101">{{item.now}}</div>
            <div>{{item.time}}</div>
            <div>{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clearInterval } from "timers";
// import qs from 'qs'
export default {
  name: "login",
  data() {
    return {
      timeArr: [],
      arr: ["product"],
      list: [
        {
          name: "所持通证"
        },
        {
          name: "收益记录"
        }
      ],
      tabIndex: 0,
      noteTab: [
        {
          name: "数量"
        },
        {
          name: "时间"
        },
        {
          name: "备注"
        }
      ],
      noteList: [
        {
          name: "备注",
          now: "728.31",
          time: "2019-06-07 14:28:12"
        },
        {
          name: "备注",
          now: "728.31",
          time: "2019-06-07 14:28:12"
        },

        {
          name: "备注",
          now: "728.31",
          time: "2019-06-07 14:28:12"
        }
      ]
    };
  },
  created() {},
  methods: {
    tab(index) {
      this.tabIndex = index;
    },
    drawLine(arrs) {
      console.log(222);

      // 基于准备好的dom，初始化echarts实例
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let arr = ["product"];
      // 绘制图表
      myChart.setOption({
        legend: {},
        tooltip: {
          trigger: "axis",
          showContent: false
        },
        dataset: {
          source: [
            arrs,

            [ this.$t("udbInfo.zong"), 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            [this.$t("udbInfo.buy"), 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            [this.$t("udbInfo.sale"), 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            [this.$t("udbInfo.price"), 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: "category" },
        yAxis: { gridIndex: 0 },
        grid: { top: "15%" },
        series: [
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" }
        ]
      });
    },
    // 实时变化
    getDateArray(endDate, splitTime, count) {
      if (!endDate) {
        endDate = new Date();
      }
      if (!splitTime) {
        splitTime = 5 * 60 * 1000;
      }
      if (!count) {
        count = 5;
      }
      var endTime = endDate.getTime();
      var mod = endTime % splitTime;
      if (mod > 0) {
        endTime -= mod;
      }
      var dateArray = [];
      while (count-- > 0) {
        var d = new Date();
        d.setTime(endTime - count * splitTime);
        dateArray.push(
          d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        );
      }
      console.log(this.arr.concat(dateArray));
      this.drawLine(this.arr.concat(dateArray));
    },

    timeNow() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour = date.getHours();
      var minu = date.getMinutes();
      var sec = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (minu >= 0 && minu <= 9) {
        minu = "0" + minu;
      }
      if (sec >= 0 && sec <= 9) {
        sec = "0" + sec;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      var currentdate = hour + seperator2 + minu + seperator2 + sec;
      console.log(currentdate);

      this.timeArr = [
        currentdate,
        currentdate,
        currentdate,
        currentdate,
        currentdate
      ];
      let i = 1;
      for (i = 1; i < this.timeArr.length - 1; i++) {
        let a = this.timeArr[i].split(":")[1];

        let b = this.timeArr[i].split(":")[2];
        b = b - 5 * i;
        if (b < 5) {
          a--;
          b = b + 60;
        }
        if (a < 0) {
          a = a + 60;
        }
        this.timeArr[i] = a + "-" + b;
        // console.log(a + ":" + b);
        // 12.1  11.56 11.51
        // 12.1 12.-4 12.-9

        // 12:50:13 58

        // -12  -7  -2  3 8
      }
      // this.timeArr.push(currentdate)
      // if (this.timeArr.length>5) {
      //   this.timeArr.shift()
      // }
      console.log(this.timeArr);
    },

    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      //前十分钟时间
      var minutes = parseInt("5");

      var interTimes = minutes * 60 * 1000;

      var interTimes = parseInt(interTimes);
      date = new Date(Date.parse(date) - interTimes);

      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hour +
        seperator2 +
        minutes +
        seperator2 +
        date.getSeconds();
      this.timeArr.push(currentdate);
      if (this.timeArr.length > 5) {
        this.timeArr.shift();
      }
      console.log(this.timeArr);

      return currentdate;
    }
  },
  mounted() {
    document.title = "UDB通证";
    this.drawLine();
    // var time = null;
    this.getDateArray();

    // console.log(a);

    this.timeArr = setInterval(this.getDateArray, 50000);
  },
  destroyed() {
    console.log("离开");
    window.clearInterval(this.timeArr);
  }
};
</script>
<style lang="scss" scoped>
i {
  display: inline-block;
}
.login {
  overflow: hidden;
  min-height: 100vh;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.15rem;
  .bottom {
    .tab {
      margin-top: 0.15rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .item {
        height: 0.32rem;
        width: 22.5%;
        font-size: 0.15rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .active {
        font-size: 0.15rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(31, 23, 201, 1);
        .xian {
          width: 100%;
          height: 0.02rem;
          background: rgba(12, 105, 220, 1);
          border-radius: 0.01rem;
        }
      }
    }
    .duihuan {
      padding-top: 0.52rem;
      .content {
        width: 100%;
        height: 1rem;
        background: linear-gradient(
          90deg,
          rgba(58, 48, 207, 1),
          rgba(65, 104, 238, 1)
        );
        border-radius: 0.1rem;
        padding: 0.25rem 0.18rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .top {
            font-size: 0.12rem;
            font-family: SourceHanSansSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .bottom {
            font-size: 0.24rem;
            font-family: SourceHanSansSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
        }
        .right {
          display: flex;
          align-items: center;
          .open {
            width: 0.6rem;
            height: 0.28rem;
            border: 0.01rem solid rgba(255, 255, 255, 1);
            border-radius: 0.04rem;

            font-size: 0.12rem;
            font-family: SourceHanSansSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            &:first-child {
              margin-right: 0.1rem;
            }
          }
        }
      }
    }

    .note {
      .tabs {
        height: 0.43rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item {
          width: 22.5%;
          font-size: 0.14rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
      .content {
        width: 100%;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            word-break: break-all;
            word-wrap: break-word;
            // flex-wrap: wrap;
            width: 22.5%;
            height: 0.55rem;
            font-size: 0.15rem;
            font-family: SourceHanSansSC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
        }
      }
    }
  }
}
</style>


