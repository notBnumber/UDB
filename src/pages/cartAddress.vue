<template>
  <div class="login">
    <div class="content">
      <div class="df">转账唯一地址，填错自负!!!</div>
      <input type="text" placeholder="请输入姓名" v-model="content">
      <span>（点击此处 复制链接地址）</span>
    </div>
    <div class="btn df" :class="[kong == true && 'active']">修改</div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      content: ""
    };
  },
  computed: {
    kong: function() {
      if (this.content == "") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    del() {
      this.content = "";
    }
  },
  mounted() {
    document.title = "设置";
    this.http = localStorage.getItem("http");
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #fafafa;
  min-height: 100vh;
  position: relative;
  .content {
    width: 100%;
    height: 0.35rem;
    div {
      height: 0.52rem;
      background-color: #fff;
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    input {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      padding-left: 0.16rem;
      text-align: center;
    }
    span {
      display: inline-block;
      width: 100%;
      text-align: center;
      margin-top: .18rem;
      // height:15px;
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(31, 23, 201, 1);
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(58, 48, 207, 1),
      rgba(65, 104, 238, 1)
    );
    height: 0.49rem;

    font-size: 0.18rem;
    font-family: SourceHanSansSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
