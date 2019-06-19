<template>
  <div class="login">
    <div class="head">
      <img src="@/assets/img/login_b01.png" alt="">
    </div>
    <div class="big">
      <input type="text" class="input2" v-model="phone" placeholder="请输入手机号码">
      <i class="i1"></i>
      <i class="i2" v-if="phone!=''" @click="phone = ''"></i>
    </div>
    <!-- 验证码 -->
    <div class="big bigs">
      <input type="text" v-model="code" placeholder="请输入验证码">
      <i class="i5"></i>
      <div class="inputDiv" @click="getCode" :class="[timeState && 'inputDiv_active']">
        {{getCodes}}
      </div>
    </div>
    <div class="big bigs">
      <input :type="pwdType" class="input2" v-model="pwd" placeholder="请输入6-12位密码(学生)">
      <i class="i3"></i>
      <i class="i4" @click="showPwd"></i>
    </div>

    <div class="big bigs">
      <input :type="pwdType1" class="input2" v-model="pwd2" placeholder="请输入6-12位密码(健身达人)">
      <i class="i7"></i>
      <i class="i4" @click="showPwd1"></i>
    </div>

    <div class="btn" @click="btn" :class="[(phone == '' || pwd == '' || pwd2 =='' || code == '') && 'btn_active']">
      注册
    </div>
    <p class="tip">
      *为了您使用的时候，无忧地切换直播内容，请为相应的直 播内容设置内容密码
    </p>
    <div class="check">
      <el-checkbox v-model="checked" @change="check">点击表示已经阅读并同意</el-checkbox>
      <router-link to="/xieyi">
        <span>《用户协议》</span>
      </router-link>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  name: "login",
  data() {
    return {
      phone: "",
      pwd: "",
      student: true,
      code: "",
      pwd2: "",
      pwdType: "password",
      pwdType1: "password",
      checked: false,
      getCodes: "获取验证码",
      setTime: null,
      timeState: false
    };
  },
  created() {},
  methods: {
    check() {
      console.log(this.checked);
    },
    btn() {
      let that = this;
      console.log(this.phone);
      if (this.phone == "") {
        this.$toast("请输入手机号码");
        return;
      }
      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.$toast("请输入正确的手机号码");
        return;
      }
      if (this.checked == false) {
        this.$toast("未同意协议");
        return;
      }
      if (this.code == "") {
        this.$toast("请输入验证码");
        return;
      }
      if (this.pwd == "") {
        this.$toast("请输入学生密码");
        return;
      }
      if (this.pwd2 == "") {
        this.$toast("请输入健身达人密码");
        return;
      }
      let str = Number(this.pwd.split("").length);
      if (str < 6) {
        this.$toast("学生密码个数不能小于6位");
        return;
      }
      if (str > 8) {
        this.$toast("学生密码个数不能超过8位");
        return;
      }
      let str2 = Number(this.pwd2.split("").length);
      if (str2 < 6) {
        this.$toast("健身达人密码个数不能小于6位");
        return;
      }
      if (str2 > 8) {
        this.$toast("健身达人密码个数不能超过8位");
        return;
      }
      this.$api
        .register({
          phone: this.phone,
          code: this.code,
          adultPassword: this.pwd2,
          studentPassword: this.pwd,
          openId: sessionStorage.getItem("openId")
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            console.log(res);
            this.$toast(res.desc);
            this.$router.push({ path: "/login" });
          }
        });
    },
    // 切换身份
    toStudent() {
      console.log(2);

      this.student = !this.student;
    },
    // 删除号码
    delPhone() {
      this.phone = "";
    },
    // 显示密码
    showPwd() {
      this.pwdType = this.pwdType === "password" ? "text" : "password";
    },
    showPwd1() {
      this.pwdType1 = this.pwdType1 === "password" ? "text" : "password";
    },
    //获取验证码
    getCode() {
      let num = 60;
      // this.getCodes = "重发(" + num + ")";

      this.$api
        .code({
          phone: this.phone,
          type: 0,
          openId: sessionStorage.getItem("openId")
        })
        .then(res => {
          console.log("验证码", res);
          if (res.code == 1) {
            this.getTime(num);
            console.log(res);
          }
        });
    },
    getTime(num1) {
      let num = num1;
      this.setTime = setInterval(() => {
        if (num > 0) {
          console.log(num);

          // this.canSend = false;
          this.getCodes = "重发(" + num + ")";
          this.timeState = true;
          num--;
        } else {
          console.log(99999);
          this.timeState = false;
          clearInterval(this.setTime);
          this.getCodes = "获取验证码";
          // this.canSend = true;
        }
      }, 1000);
    }
  },
  mounted() {
    document.title = "注册";
  }
};
</script>
<style lang="scss" scoped>
i {
  display: inline-block;
}
input::-webkit-input-placeholder {
  font-size: 0.15rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
}
.login {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  padding-top: 0.42rem;
  box-sizing: border-box;

  .head {
    margin: auto;
    width: 0.79rem;
    height: 0.79rem;
    img {
      width: 0.79rem;
      height: 0.79rem;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .big {
    margin: auto;
    margin-top: 0.41rem;
    position: relative;
    width: 2.9rem;
    height: 0.4rem;
    display: flex;
    align-items: center;
    border-radius: 0.2rem;
    overflow: hidden;
    border: none;
    .inputDiv {
      position: absolute;
      right: 0;
      width: 0.98rem;
      text-align: center;
      height: 0.14rem;
      line-height: 0.14rem;
      border-left: 0.01rem solid #cccccc;
      font-size: 0.14rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(54, 173, 255, 1);
    }
    .inputDiv_active {
      color: #999999;
    }
  }
  .bigs {
    margin-top: 0.2rem;
  }
  input {
    height: 100%;
    width: 100%;
    overflow: hidden;
    border: none;
    outline: none;
    background: #f5f5f5;
    border-radius: 0.2rem;
    padding-left: 0.43rem;
    box-sizing: border-box;
    font-size: 0.15rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }

  .i1 {
    background-image: url("~@/assets/img/login_a06.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    left: 0.22rem;
    top: 0.13rem;
    bottom: 0.11rem;
    width: 0.15rem;
    height: 0.15rem;
  }
  .i5 {
    background-image: url("~@/assets/img/login_b03.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    left: 0.22rem;
    top: 0.13rem;
    bottom: 0.11rem;
    width: 0.15rem;
    height: 0.15rem;
  }
  .i2 {
    background-image: url("~@/assets/img/login_a09.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    right: 0.22rem;
    top: 0.13rem;
    bottom: 0.11rem;
    width: 0.15rem;
    // height: 15rem;
  }
  .i3 {
    background-image: url("~@/assets/img/login_b02.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    left: 0.22rem;
    top: 0.13rem;
    bottom: 0.11rem;
    width: 0.15rem;
    // height: 15rem;
  }
  .i4 {
    background-image: url("~@/assets/img/login_a08.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    right: 0.22rem;
    top: 0.13rem;
    bottom: 0.11rem;
    width: 0.15rem;
    // height: 15rem;
  }
  .i7 {
    background-image: url("~@/assets/img/login_b04.png");
    /*引入图片图片*/
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    left: 0.22rem;
    top: 0.13rem;
    bottom: 0.11rem;
    width: 0.15rem;
    // height: 15rem;
  }
  .lost {
    margin: auto;
    width: 2.9rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.3rem;
    p {
      font-size: 0.14rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .btn {
    width: 2.9rem;
    margin: auto;
    margin-top: 0.3rem;
    border-radius: 0.25rem;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    background-color: rgb(54, 173, 255);
    color: #fff;
  }
  .btn_active {
    background-color: #8dd1ff;
  }
  .tip {
    margin: auto;
    margin-top: 0.1rem;
    width: 2.8rem;
    color: #ff5050;
    font-size: 0.11rem;
  }
  .check {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-top: 0.26rem;
    font-size: 0.13rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    .input-checkbox {
      width: 0.16rem;
      height: 0.16rem;
    }
    span {
      display: inline-block;
      color: #36adff;
      margin-left: -0.33rem;
    }
  }
  // .input_div {
  //   position: absolute;
  //   height: 14rem;
  //   line-height: 14rem;
  //   top: 13rem;
  //   right: 0;
  //   bottom: 13rem;
  //   width: 98rem;
  //   border-left: 1rem solid #cccccc;
  //   color: #cccccc;
  //   text-align: center;
  //   font-size: 14rem;
  // }
}
</style>


