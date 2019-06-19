<template lang="html">
    <div class="content">
        <div class="top">
            <div class="left">
                <img src="@/assets/image/tab1.png" alt="">
            </div>
            <div class="right">
                <div class="name">select from...</div>
                <div class="info">
                    <div class="uid">
                        UID：6113
                    </div>
                    <div class="level">
                        级别：VIP1星
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div>
                <span>
                  余额：   
                </span>
                <img src="@/assets/image/logo1.png" alt="">
                <span>5555</span>
            </div>
            <div>
                <span>
                  资产：      
                </span>
                <img src="@/assets/image/logo1.png" alt="">
                <span>5555</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.content {
  background: url("~@/assets/image/info.png") no-repeat;
  width: 100%;
  padding: 0.1rem 0 0.13rem 0.3rem;
  background-size: 100%;
  position: relative;
  .top {
    display: flex;
    .left {
      img {
        width: 0.44rem;
        height: 0.44rem;
        border-radius: 50%;
      }
    }
    .right {
      margin-left: 0.17rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        font-size: 0.15rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .info {
        display: flex;
        align-items: center;
        font-size: 0.13rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.4rem;
    background: rgba(12, 105, 220, .5);
    border-radius: 0 0 0.16rem 0.16rem;
    padding-left: 0.13rem;
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      font-size: 0.15rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      span {
      margin-left: .05rem;
      }
      img {
        width: .12rem;
      }
      &:last-child{
          margin-left: .46rem;
      }
    } 
  }
}
</style>
