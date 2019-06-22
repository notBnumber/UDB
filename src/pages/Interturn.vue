<template>
  <div class="login">
    <!-- <div class="title">
      {{$t("message.title")}}
    </div>-->
    <div class="top">
      <info :info='info'></info>
    </div>
    <div class="tab">
      <div
        class="item"
        :class="[tabIndex == index && 'active']"
        v-for="(item,index) in $t('retrun.list')"
        :key="index"
        @click="tab(index)"
      >
        <span>{{item.name}}</span>
        <div class="xian"></div>
      </div>
    </div>
    <div
      class="duihuan"
      v-if="tabIndex==0"
    >
      <div v-if="!show">
        <div class="title">{{$t('retrun.tip1')}}</div>
        <input
          type="text"
          class
          :placeholder=p1
          v-model="udbId"
        >
        <div
          class="btn df"
          @click="next()"
        >下一步</div>
      </div>
      <div v-if="show">
        <div class="title">{{$t('retrun.tip1')}}</div>
        <input
          type="text"
          class
          placeholder="请输入1的整数倍"
          v-model="udbNum"
        >
        <div
          class="btn df"
          @click='btn'
        >确认兑换</div>
      </div>
    </div>
    <div
      class="duihuan"
      v-if="tabIndex==1"
    >
      <div v-if="!show">
        <div class="title">{{$t('retrun.tip1')}}</div>
        <input
          type="text"
          class
          :placeholder=p1
          v-model="yueId"
        >
        <div
          class="btn df"
          @click="next()"
        >下一步</div>
      </div>
      <div v-if="show">
        <div class="title">{{$t('retrun.tip1')}}</div>
        <input
          type="text"
          class
          placeholder="请输入1的整数倍"
          v-model="yueNum"
        >
        <div
          class="btn df"
          @click='btn'
        >确认兑换</div>
      </div>
    </div>
    <!-- 请输入需要兑换的AKFL通证数 -->
    <div
      class="note"
      v-if="tabIndex==2"
    >
      <div class="tabs">
        <div
          class="item df"
          v-for="(item,index) in noteTab"
          :key="index"
        >{{item.name}}</div>
      </div>
      <div class="content">
        <div
          class="item"
          v-for="(item,index) in noteList"
          :key="index"
        >
          <div>{{item.name}}</div>
          <div
            class="money"
            :class="[item.state ==0 && 'active']"
          >{{item.money}}</div>
          <div>{{item.now}}</div>
          <div>{{item.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import qs from 'qs'
import Tab from "../components/Tab";
import info from "../components/info";

export default {
  components: { Tab, info },

  name: "login",
  data() {
    return {
      p1:this.$t('retrun.tip2'),
      info: null,
      udbId: "",
      yueId: "",
      udbNum: "",
      yueNum: "",
      show: false,
      phone: "",
      pwd: "",
      student: true,
      pwdType: "password",
      state: 1,
      http: "",
      list: [
        {
          name: "UDB转出 "
        },
        {
          name: "余额转出 "
        },
        {
          name: "互转记录"
        }
      ],
      tabIndex: 0,
      noteTab: [
        {
          name: "业务类型"
        },
        {
          name: "金额"
        },
        {
          name: "当前余额"
        },
        {
          name: "时间"
        }
      ],
      noteList: [
        {
          name: "UDB兑换",
          money: "8.39",
          now: "728.31",
          time: "2019-06-07 14:28:12",
          state: 0
        },
        {
          name: "UDB兑换",
          money: "8.39",
          now: "728.31",
          time: "2019-06-07 14:28:12",
          state: 1
        },

        {
          name: "UDB兑换",
          money: "8.39",
          now: "728.31",
          time: "2019-06-07 14:28:12",
          state: 1
        }
      ]
    };
  },
  created() {},
  methods: {
    toDetail(id) {
      this.$router.push({ path: "/zhiboDetail", query: { id: id } });
    },
    tab(index) {
      this.tabIndex = index;
    },
    next() {
      this.show = !this.show;
      if (this.tabIndex == 0) {
        this.$api
          .getInfo({
            touid: this.udbId
          })
          .then(res => {
            if (res.status == 1) {
              this.info = res.result;
            } else {
            }
          });
      } else {
        this.$api
          .getInfo({
            touid: this.yueId
          })
          .then(res => {
            if (res.status == 1) {
              this.info = res.result;
            } else {
            }
          });
      }
    },
    btn() {
      this.show = !this.show;
      if (this.tabIndex == 0) {
        this.$api
          .changetz({
            touid: this.udbId,
            tznum: this.udbNum
          })
          .then(res => {
            if (res.status == 1) {
              this.info = res.result;
            } else {
            }
          });
      } else {
        this.$api
          .changemoney({
            touid: this.yueId,
            money: this.yueNum
          })
          .then(res => {
            if (res.status == 1) {
              this.info = res.result;
            } else {
            }
          });
      }
    }
  },
  mounted() {
    document.title = "互转";
    this.http = localStorage.getItem("http");
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  padding: 0 0.15rem;
  .top {
    width: 100%;
    height: 1.4rem;
    padding: 0.2rem 0 0;
    display: flex;
    justify-content: center;
  }
  .tab {
    margin-top: 0.41rem;
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
    padding-top: 0.6rem;
    .title {
      text-align: center;
      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    input {
      margin-top: 0.25rem;
      width: 100%;
      height: 0.4rem;
      border: 0.01rem solid rgba(204, 204, 204, 1);
      border-radius: 0.2rem;
      text-align: center;

      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: #333333;
    }

    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #aab2bd; /* placeholder字体大小  */
      /* placeholder位置  */
      text-align: center;

      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(187, 187, 187, 1);
    }
    .tip {
      margin-top: 0.23rem;
      text-align: center;
    }
    .btn {
      width: 100%;
      height: 0.4rem;
      background: linear-gradient(
        90deg,
        rgba(58, 48, 207, 1),
        rgba(65, 104, 238, 1)
      );
      border-radius: 0.2rem;
      margin-top: 0.65rem;
      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .tixian {
    padding-top: 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      margin-top: 0.25rem;
      width: 100%;
      height: 0.4rem;
      border: 0.01rem solid rgba(204, 204, 204, 1);
      border-radius: 0.2rem;
      text-align: center;

      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: #333333;
    }

    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #aab2bd; /* placeholder字体大小  */
      /* placeholder位置  */
      text-align: center;

      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(187, 187, 187, 1);
    }
    .tip {
      text-align: center;
      font-size: 0.12rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .btn {
      width: 100%;
      height: 0.4rem;
      background: linear-gradient(
        90deg,
        rgba(58, 48, 207, 1),
        rgba(65, 104, 238, 1)
      );
      border-radius: 0.2rem;
      margin-top: 0.65rem;
      font-size: 0.14rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
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
        .money {
          color: #f90101;
        }
        .active {
          color: #008000;
        }
      }
    }
  }
}
</style>


