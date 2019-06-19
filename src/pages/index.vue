<template lang="html">
  <div class="content">
    <!-- <div style='display:flex;justify-content:space-between'>
      <div @click=china()>中文</div>
    <div @click=eng()>英文</div>
    </div>

    <span>{{language?Chinese.title:english.title}}</span> -->
    <!--中英文切换 -->
    <div class="title">
    <div class="select">
      <div class="top" @click='select()'>
        {{selectText}}

      </div>
      <div class="bottom" v-if='isSelect'>
        <div class="item df"  v-for='(item,index) in selectList' :key='index' @click='changeLanguage(index)'>
          {{item.name}}
        </div>
      </div>
    </div>

    </div>
    <div class="tab">
      <div class="item" v-for='(item,index) in $t("message.tabsList")' :key='index'>
        <div class="top">{{item.name}}</div>
        <div class="top">{{item.num}}</div>
      </div>
    </div>
    <div class="tabs">
      <div class="item"  v-for='(item,index) in $t("message.tabList")' :key='index'>
        <img :src=liss[index].url alt="">
          <div>{{item.name}}</div>
      </div>
    </div>
    <Tab :tabIndex="0" :language="language"></Tab>
  </div>
</template>
<script>
import articleList from "../components/articleList";
import consultation from "../components/consultation";
import Tab from "../components/Tab";
import img from "../assets/image/tab1.png";

export default {
  components: { articleList, consultation, Tab },
  data() {
    return {
      brands: [
        this.$t("brands.item1"),
        this.$t("brands.item2"),
        this.$t("brands.item3"),
        this.$t("brands.item4"),
        this.$t("brands.item5"),
        this.$t("brands.item6"),
        
      ],
      liss:[
        {url:img},
        {url:img},
        {url:img}
      ],
      Chinese: {
        title: "标题"
      },
      english: {
        title: "title"
      },
      language: false,
      tabList: [
        {
          nameC: "余额",
          nameE: "yue",
          num: 312.0
        },
        {
          nameC: "资产",
          nameE: "yue",
          num: 312.0
        },
        {
          nameC: "RP",
          nameE: "yue",
          num: 312.0
        },
        {
          nameC: "AKFL通证",
          nameE: "yue",
          num: 312.0
        },
        {
          nameC: "UDB通证余额",
          nameE: "yue",
          num: 312.0
        },
        {
          nameC: "购物券",
          nameE: "yue",
          num: 312.0
        }
      ],
      selectList: [{ name: "CN 中文" }, { name: "EN 英文" }],
      selectIndex: 0,
      isSelect: false,
      selectText: "CN 中文"
    };
  },
  methods: {
    china() {
      localStorage.setItem("language", true);
      this.language = true;
      // this.$emit('blur','sichaoyun'); //触发事件
      // location.reload()
    },
    eng() {
      localStorage.setItem("language", false);
      this.language = false;
      // location.reload()
    },
    //显示选择框
    select() {
      this.isSelect = !this.isSelect;
    },
    // 中英文切换
    changeLanguage(index) {
      this.selectText = this.selectList[index].name;
      this.isSelect = !this.isSelect;
      this.language = !this.language;
      localStorage.setItem("language", index);
      if (index == 0) {
        localStorage.setItem("locale", "zh");
        this.$i18n.locale = localStorage.getItem("locale");
      } else if (index == 1) {
        localStorage.setItem("locale", "en");
        this.$i18n.locale = localStorage.getItem("locale");

      }
        this.brands = this.$t("brands")

            for(let item of this.$t("message.tabsList")) {
      item.num = 2
    }
    console.log((navigator.language || navigator.browserLanguage).toLowerCase());
    
    }
  },
  mounted() {
    document.title = "首页";
    // var arr, reg = new RegExp("(^| )" + 'PLAY_LANG' + "=([^;]*)(;|$)");
    // console.log(document.cookie.match(reg),'8888');
    //  var lang = navigator.language||navigator.userLanguage;//常规浏览器语言和IE浏
    //  console.log(lang);
    // //  alert(lang)
         
    // this.http = localStorage.getItem("http");
    //   var languageindex=localStorage.getItem('language');
    //   var locallang=localStorage.getItem("locale");
    //   if (languageindex=='undefined'){
    //       languageindex=0
    //   }
    //   if (locallang=='undefined') {
    //       locallang='zh'
    //   }

    // // this.selectText = this.selectList[languageindex].name;
    
    // this.selectIndex=0
    // this.$i18n.locale = locallang;
    // function getUrlParam(name) {
    //   if (window.location.href.indexOf("?") != -1) {
    //     let r = window.location.href.split("?")[1].split("&"); //匹配目标参数
    //     for (let val of r) {
    //       // console.log(val.split('=')[0])
    //       if (val.split("=")[0] == name) {
    //         return val.split("=")[1];
    //       }
    //     }
    //   } else {
    //     return null;
    //   }
    // }
  },
  destroyed: function() {
    console.log("离开页面");
  }
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
}
.title {
  position: relative;
  width: 100%;
  height: 2.55rem;
  background: url("~@/assets/image/banner.png") no-repeat;
  background-size: 100%;
  .select {
    position: absolute;
    right: 0.13rem;
    top: 0.05rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .top {
      font-size: 0.16rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(254, 254, 254, 1);
    }
    .bottom {
      .item {
        width: 0.9rem;
        height: 0.3rem;
        background: rgba(0, 0, 0, 1);
        opacity: 0.6;
        font-size: 0.16rem;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(254, 254, 254, 1);
        &:first-child {
          border-bottom: 0.01rem solid #ffffff;
        }
      }
    }
  }
}

.tab {
  width: 3.45rem;
  height: 1.6rem;
  border-radius: 0.1rem;
  background: url("~@/assets/image/bg.png") no-repeat;
  background-size: 100%;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  top: -0.46rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 33.3%;
    height: 50%;
    display: flex;
    flex-direction: column;
    padding-top: 0.19rem;
    align-items: center;
    div {
      font-size: 0.18rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      &:last-child {
        line-height: 0;
        margin-top: 0.11rem;
        font-size: 0.15rem;
      }
    }
  }
}
.tabs {
  width: 100%;
  height: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  .item {
    img {
      width: 0.32rem;
      height: 0.32rem;
    }
    width: 33.3%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      margin-top: 0.13rem;
      font-size: 0.16rem;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>