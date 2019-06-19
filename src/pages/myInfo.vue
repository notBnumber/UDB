<template>
  <div class="login">
    <div class="content">
      <div class="item">
        <div class="left">头像</div>
        <div class="right">
          <img src="@/assets/image/tab1.png" alt class="img1">
          <img src="@/assets/image/jiantou.png" alt class="img2">
        </div>
      </div>
      <div class="item">
        <div class="left">昵称</div>
        <div class="right">
           <span>select*from ysk_use...</span>
          <img src="@/assets/image/jiantou.png" alt class="img2">
        </div>
      </div>
      <div class="item">
        <div class="left">邮箱号</div>
        <div class="right">
           <span>17788523690@163.com</span>
          <img src="@/assets/image/jiantou.png" alt class="img2">
        </div>
      </div>

      <div class="item">
        <div class="left">二维码</div>
        <div class="right">
          <img src="@/assets/image/Zer.png" alt class="img3">
          <img src="@/assets/image/jiantou.png" alt class="img2">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      isphone: false,
      about: "",
      http: "",
      logo: "",
      phone: ""
    };
  },
  methods: {},
  mounted() {
    document.title = "资料";
    this.http = localStorage.getItem("http");
  }
};
</script>
<style lang="scss" scoped>
#bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0.5;
  /*兼容IE8及以下版本浏览器*/
  //filter: alpha(opacity=30);
  // display: none;
}
.login {
  background-color: #fff;
  padding: 0.15rem 0;
  min-height: 100vh;
  .content {
    .item {
      height: 0.7rem;
      padding: 0 0.17rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid #eeeeee;
      .left {
        font-size: 0.16rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .right {
        display: flex;
        align-items: center;
        .img1 {
          width: 0.5rem;
          border-radius: 50%;
          margin-right: 0.12rem;
        }
        .img2 {
          width: 0.07rem;
        }
        .img3 {
          width: 0.5rem;
          margin-right: 0.12rem;
        }
        span {
          margin-right: 0.12rem;

        }
      }
    }
  }
}
</style>
