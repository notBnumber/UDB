<template lang="html">
  <div class="content">
    <!--顶部标签-->
    <div class="top-tab">
      <van-tabs v-model="active" sticky animated swipeable @click="tabClick">
        <van-tab v-for="(item,index) in tabList" :key="index" :title="item.name">
          <div class="poster-list" v-if="list.length>0">
            <div class="poster-item" v-for="(item,index) in list" :key="index" @click="preview(item.id)">
              <img :src="imgUrl + item.image" alt="">
              <span class="fs14 color6">{{item.title}}</span>
            </div>
          </div>
          <div class="color3 fs14" style="height: 4.94rem;display: flex;align-items: center;justify-content: center" v-else>没有海报了</div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="mask" v-if="mask" @click="mask=false">
      <div class="box">
        <div class="imgs">
          <img :src="previewImg" alt="">
          <!--<img class="qrcode" src="@/assets/img/qrcode_pic.png" alt="">-->
        </div>
        <span class="fs14 color6">长按图片保存</span>
      </div>
    </div>
    <!--底部tab-->
    <Tab :tabIndex="2"></Tab>
  </div>
</template>
<script>
  import Tab from '../components/Tab'
  import img1 from '@/assets/img/poster_pic_1.png'
  import img2 from '@/assets/img/poster_pic_2.png'
  import img3 from '@/assets/img/poster_pic_3.png'
  import img4 from '@/assets/img/poster_pic_4.png'
  export default {
    components: {Tab},
    data() {
      return {
        active: 0,
        mask: false,
        previewImg: '',
        tabList: [],
        list: [],
        labelId: null
      }
    },
    methods: {
      // 切换tab
      tabClick: function (index,title) {
        this.active=index
        this.labelId = this.tabList[index].id
        this.getList(this.labelId,1)
      },
      // 打开弹窗预览图片
      preview: function (id) {
        this.previewImg = ''
        this.$api.savePoster({
          sessionId: localStorage.getItem('sessionId'),
          labelId: this.labelId,
          posterId: id
        }).then(res=>{
          console.log(res);
          if(res.code==1){
            this.previewImg = this.imgUrl+ res.desc
          }
        })
        this.mask=true
        // this.previewImg=imgUrl
      },
      // 获取海报列表
      getList:function (labelId,pageNumber) {
        this.$api.posterList({
          sessionId: localStorage.getItem('sessionId'),
          labelId: labelId,
          pageSize: 9,
          pageNumber: pageNumber,
        }).then(res=>{
          console.log('海报中心列表',res)
          this.list = res.data.list
          this.totalPage = res.data.totalPage
          this.pageNumber = res.data.pageNumber
        })
      }
    },
    mounted() {
      document.title='海报中心'
      this.$api.posterLabel().then(res=>{
        console.log('海报中心标签', res)
        if(res.code==1){
          this.tabList = res.data
          this.active = 0
          this.labelId = res.data[0].id
          // 获取第一项标签下的海报列表
          this.getList(this.labelId,1)
        }
      })

    }
  }
</script>

<style lang="css" scoped>
  .content {
    width: 100%;
    margin: 0 auto;
    padding-bottom: .5rem;
  }
  .poster-list{
    padding: .15rem;
    background-color: #fff;
    margin-top: .1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .poster-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: .1rem;
  }
  .poster-item>img{
    width: 1.05rem;
    height: 1.4rem;
    margin-bottom: .07rem;
  }
  /*弹出层*/
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 10000;
  }
  .mask .box{
    width: 3rem;
    height: 4.3rem;
    background-color: #fff;
    border-radius: .05rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .mask .box>.imgs{
    width: 2.5rem;
    height: 3.5rem;
    margin-bottom: .15rem;
    position: relative;
  }
  .mask .box>.imgs .qrcode{
    width: .6rem;
    height: .6rem;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 99999;
  }
  .mask .box>div>img:first-child{
    width: 100%;
    height: 100%;
  }
</style>
