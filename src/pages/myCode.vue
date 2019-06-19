<template>
  <div class="login">
    <div class="content">
      <div class="info">
        <img src="@/assets/image/tab1.png" alt>
        <div class="right">
          <div class="name">select*from ysk_use...</div>
          <div class="ids">UID：6113</div>
        </div>
      </div>
      <div class="code">
        
      <img src="@/assets/image/tab1.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    document.title = "设置";
    this.http = localStorage.getItem("http");
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #FAFAFA;
  padding: 0.5rem 0.15rem;
  min-height: 100vh;
  .content {
    width: 100%;
    // width:3;
    height: 4.4rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.1rem;
    padding: 0.17rem;
    .info {
      height: 0.64rem;
      display: flex;
      img {
        width: 0.64rem;
        border-radius: 50%;
      }
      .right {
        margin-left: 0.17rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .name {
          font-size: 0.16rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .ids {
          font-size: 0.15rem;
          font-family: SourceHanSansSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .code {
      margin-top: .3rem;
      img {
        width: 2.6rem;
      }
    }
  }
}
</style>
