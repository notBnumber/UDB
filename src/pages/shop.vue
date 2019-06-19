<template lang="html">
  <div class="content">

    <Tab :tabIndex="3"></Tab>
  </div>
</template>
<script>
import Tab from "../components/Tab";
export default {
  components: { Tab },
  data() {
    return {
      isSignIng: false,
      checked: false,
      myInfo: {},
      classIndex: 0,
      browsePages: [],
      http: "",
      websock: null //建立的连接
    };
  },
  created() {
    //页面刚进入时开启长连接
    // this.initWebSocket();
  },
  destroyed: function() {
    //页面销毁时关闭长连接
    // this.websocketclose();
  },
  methods: {
    // 浏览记录

    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://10.0.0.250:8888"; //ws地址
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;

      this.websock.onerror = this.websocketonerror;

      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },

    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data); //注意：长连接我们是后台直接1秒推送一条数据，
      //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
      console.log(redata.value, "返回");
    },

    websocketsend() {
      //数据发送
      let obj = {
        sessionId: localStorage.getItem("sessionIds"),
        type: 1
      };
      console.log(JSON.stringify(obj), "json");

      this.websock.send(JSON.stringify(obj), "json");
    },

    websocketclose(e) {
      //关闭
      console.log(e);

      // console.log(e,"connection closed (" + e.code + ")",'挂壁');
    },
    init() {
      this.$api
        .browsePage({
          pageNumber: 1,
          pageSize: 99,
          sessionId: localStorage.getItem("sessionIds")
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            this.browsePages = res.data.list;
          }
        });
    },
    getInfo() {
      this.$api
        .userDetail({
          sessionId: localStorage.getItem("sessionIds")
        })
        .then(res => {
          if (res.code == 1) {
            console.log(res);
            this.myInfo = res.data;
          }
        });
    },
    toDel() {
      // this.$router.push({ path: "/del" });
      this.$api
        .updateWechatDetail({
          sessionId: localStorage.getItem("sessionIds"),
          openId: sessionStorage.getItem("openId")
        })
        .then(res => {
          if (res.code == 1) {
            console.log(res);
            this.$toast(res.desc);
          }
        });
    },
    toclass(index, id,state) {
      this.classIndex = index;
      if (state == 1) {
        this.$router.push({ path: "/ingDetail", query: { id: id } });
      } else {
        this.$router.push({ path: "/zhiboed", query: { id: id } });
      }
    },
    pageTo: function(url, params) {
      this.$router.push({ name: url, params: { info: params } });
    },
    // 推送消息开关
    isPush: function(checked) {
      console.log(checked);
    },
    // 签到
    SignIng: function() {
      this.$api
        .sign({
          sessionId: localStorage.getItem("sessionId")
        })
        .then(res => {
          console.log("签到", res);
          if (res.data.code == 1) {
            this.myInfo.isSign = true;
            this.myInfo.Integral += res.data.data.integral;
            this.$toast({
              message: `签到成功,积分+${res.data.data.integral}`,
              duration: 2000
            });
          }
          if (res.data.code == 0) {
            this.$toast({
              message: res.data.desc,
              duration: 2000
            });
          }
        });
    },
    outLogin() {
      console.log("???");
          this.$router.push({ path: "/login" });

          this.socketApi.websocketclose();
      this.$api
        .logout({
          sessionId: localStorage.getItem("sessionIds")
        })
        .then(res => {
          if (res.code == 1) {
            console.log(res);
            // this.$router.push({ path: "/login" });
          } else {
            }
        });
    }
  },
  mounted() {
    document.title = "个人中心";
    this.http = localStorage.getItem("http");
    // this.$api.myInfo({
    //   sessionId: localStorage.getItem('sessionId')
    // }).then(res=>{
    //   console.log('个人中心', res)
    //   this.myInfo = res.data
    // })
  }
};
</script>

<style lang="css" scoped>
.phone {
  font-size: 0.12rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.content {
  width: 100%;
  margin: 0 auto;
}
.top {
  width: 100%;
  padding: 0 0.15rem;
  background-color: #fff;
}
/*用户信息*/
.user-info {
  display: flex;
  align-items: center;
  padding: 0.15rem 0;
  border-bottom: 0.01rem solid #eaeaea;
  background: url("~@/assets/img/right_icon.png") no-repeat right center;
  background-size: 0.15rem 0.15rem;
  position: relative;
}
.user-info img {
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.11rem;
  border-radius: 50%;
}
.user-info > div {
  height: 0.7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.right_div {
  width: 1.1rem;
  height: 0.3rem !important;
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 176, 0);
  border-radius: 0.15rem 0 0 0.15rem;
  z-index: 1;
  position: absolute;
  right: 0;
  margin-right: -0.15rem;
  padding-left: 0.1rem;
}
.right_div img {
  width: 0.16rem;
  height: 0.13rem;
}
.right_div span {
  margin-right: 0.01rem;
  font-size: 0.12rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
/*积分明细*/
.integral {
  padding: 0.15rem 0;
  /*display: flex;*/
  /*flex-direction: column;*/
}
.integral > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.1rem;
}
.integral > div:last-child {
  margin-bottom: 0;
}
.integral .btn {
  width: 0.64rem;
  line-height: 0.24rem;
  text-align: center;
  font-size: 0.14rem;
  color: #fff;
  background-color: #ebc04c;
  border-radius: 0.04rem;
}
.integral .btn.sign-ing {
  background-color: #dddddd;
  color: #333;
}
.integral .details-btn {
  width: 0.5rem;
  line-height: 0.24rem;
  text-align: center;
  font-size: 0.14rem;
  color: #ebc04c;
  border: 0.01rem solid #ebc04c;
  border-radius: 0.05rem;
}
/*菜单列表*/
.list {
  padding: 0 0.15rem;
  background-color: #fff;
  margin-top: 0.1rem;
}
.item {
  display: flex;
  justify-content: space-between;
  padding: 0.15rem 0;
  border-bottom: 0.01rem solid #eaeaea;
}
.item > div {
  display: flex;
  align-items: center;
}
.item:last-child {
  border-bottom: 0;
}
.item.right {
  background: url("~@/assets/img/right_icon.png") no-repeat right center;
  background-size: 0.15rem 0.15rem;
}
.noRight {
  background-size: 0 0 !important;
  
}
.item .icon {
  width: 0.24rem;
  height: 0.24rem;
  margin-right: 0.09rem;
}
.pla {
  /* margin-left: 0.7rem; */
  position: absolute;
  right: 0.4rem;
  font-size: 0.11rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  text-align: right;
}
</style>
<style lang="scss" scoped>
.nav ::-webkit-scrollbar {
  display: none !important;
}
.nav {
  .slide-box {
    // margin-top: 0.2rem;
    display: -webkit-box;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    // height: .6rem;
    padding: 0.1rem;
    box-sizing: border-box;
    background-color: #fff;
  }
  .slide-box::-webkit-scrollbar {
    width: 0 !important;
  }
  .ing_content_flex {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 1.68rem;
    // height: .95rem;
    border-radius: 0.05rem;
    overflow: hidden;
    margin-right: 0.1rem;
    .ing_img {
      position: relative;
      img {
        width: 1.68rem;
        height: 0.95rem;
        border-radius: 0.05rem;
      }
      .tips {
        position: absolute;
        left: 0;
        top: 0;
        width: 0.6rem;
        height: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(252, 191, 53);
        border-radius: 5px 0 5px 0;
        overflow: hidden;
        color: #fff;
      }
      .tip {
        position: absolute;
        right: 0;
        bottom: 0;
        min-width: 0.6rem;
        max-width: 0.6rem;
        height: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(51, 51, 51);
        border-radius: 5px 0 5px 0;
        overflow: hidden;
        color: #fff;
      }
    }
    span {
      font-size: 0.13rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 0.1rem;
    }
    p {
      font-size: 0.13rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 0.08rem;
    }
  }
  .ing_content_flex_active {
    span {
      font-size: 0.13rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(54, 173, 255, 1);
    }
    p {
      font-size: 0.13rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(54, 173, 255, 1);
    }
  }
}
.shen {
  margin-bottom: 0.55rem;
}
</style>
