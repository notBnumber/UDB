<template>
  <div class="login">
    <div class="content">
      <div class="top">
        <img src="@/assets/image/tab1.png" alt>
        <div class="info">
          <div class="nick">Vances</div>
          <div class="ids">UID：dddd1</div>
        </div>
      </div>
      <div class="bottom df">退出当前用户</div>
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
  background-color: #fafafa;
  padding: 0.15rem 0;
  min-height: 100vh;
  position: relative;
  .content {
    // width: 100%;
    .top {
      height:  0.98rem;
      background-color: #fff;
      padding: 0 0.15rem;
      display: flex;
      align-items: center;
      img {
        width: 0.64rem;
        border-radius: 50%;
      }
      .info {
        flex: 1;
        margin-left: 0.13rem;
        display: flex;
        flex-direction: column;
        .nick {
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
    .bottom {
      position: absolute;
      bottom: 0;
      // margin-left: .1rem;
      font-size: 0.18rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      width: 100%;
      height: 0.49rem;
      background: linear-gradient(
        90deg,
        rgba(58, 48, 207, 1),
        rgba(65, 104, 238, 1)
      );
    }
  }
}
</style>
