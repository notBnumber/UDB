<template>
  <div class="login">
    <img
      src="@/assets/image/4.png"
      alt
      class="logo"
    >
    <div class="content">
      <div class="item">
        <img
          src="@/assets/image/youxiang.png"
          alt
        >
        <input
          type="text"
          placeholder="请输入邮箱号"
          v-model="email"
        >
      </div>
      <div class="item last">
        <img
          src="@/assets/image/pwd.png"
          alt
        >
        <input
          type="password"
          placeholder="请输入登录密码"
          v-model="pwd"
        >
      </div>
      <span v-if="error == false">账号或密码有误，请核对后再输入</span>
      <div
        class="btn df"
        @click="login"
      >登录</div>
      <div class="util">
        <div class="items">注册</div>
        <div class="items">忘记密码？</div>
      </div>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  name: "login",
  data() {
    return {
      email: "",
      pwd: "",
      student: true,
      pwdType: "password",
      state: 0
    };
  },
  created() {},
  computed: {
    error: function() {
      if (this.pwd == 111) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    login() {
      this.$api
        .toLogin({
          account: '15625738634@163.com',
          password: 123456
        })
        .then(res => {
          if (res.status == 1) {
            this.$router.push({ path: "/index" });
          } else {
          }
        });
      // axios
      //   .post("http://udb.red/Login/checkLogin", {
      //     firstName: "Fred",
      //     lastName: "Flintstone"
      //   })
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    log(info) {
      console.log(info);
    },
    btn(e) {
      this.$router.push({ path: "/index" });
    },

    // 切换身份
    toStudent() {
      console.log(2);

      this.student = !this.student;
      if (this.student == true) {
        this.state = 0;
      } else {
        this.state = 1;
      }
    },
    // 删除号码
    delPhone() {
      this.phone = "";
    },
    // 显示密码
    showPwd() {
      this.pwdType = this.pwdType === "password" ? "text" : "password";
    }
  },
  destroyed() {
    console.log("离开");

    //页面销毁时关闭长连接
    // this.websocketclose();
  },
  mounted() {
    document.title = "登录";
  },
  created() {}
};
</script>
<style lang="scss" scoped>
i {
  display: inline-block;
}
.login {
  background: url("~@/assets/image/2.png") no-repeat;
  width: 100%;
  height: 100vh;
  padding: 1rem 0.15rem;
  box-sizing: border-box;
  position: relative;
  .logo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 1.23rem;
  }
  .content {
    width: 100%;
    height: 4.99rem;
    background-color: #fff;
    border-radius: 0.1rem;
    padding-top: 0.82rem;
    .item {
      margin: auto;
      width: 3.12rem;
      height: 0.4rem;
      background: rgba(245, 245, 245, 1);
      border-radius: 0.2rem;
      padding: 0 0.13rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.28rem;
      img {
        display: block;
        width: 0.2rem;
        height: auto;
      }
      input {
        background: rgba(245, 245, 245, 1);

        margin-left: 0.16rem;
        font-size: 0.15rem;

        flex: 1;
      }
      input::-webkit-input-placeholder {
        font-size: 0.15rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(190, 190, 190, 1);
      }
      &:last-child {
        margin-bottom: 0rem;
      }
    }
    .last {
      margin-bottom: 0.07rem;
    }
    span {
      display: inline-block;
      width: 3.12rem;
      text-align: center;
      font-size: 0.12rem;
      line-height: 0;
      font-family: SourceHanSansCN-Light;
      font-weight: 300;
      color: rgba(255, 0, 0, 1);
    }
    .btn {
      margin: 0.02rem auto;
      width: 3.12rem;
      height: 0.35rem;
      background: linear-gradient(
        90deg,
        rgba(58, 48, 207, 1),
        rgba(65, 104, 238, 1)
      );
      border-radius: 0.18rem;

      font-size: 0.15rem;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .util {
      margin: 0.32rem auto;
      width: 3.12rem;
      display: flex;
      .items {
        display: flex;
        flex: 1;
        justify-content: center;
        font-size: 0.14rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        &:first-child {
          border-right: 0.02rem solid rgba(146, 150, 156, 1);
        }
      }
    }
  }
}
</style>


