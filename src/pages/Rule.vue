<template lang="html">
  <div class="content" v-html='content'>

  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      content:'<p>富文本</p>'
    };
  },
  methods: {},
  mounted() {
    document.title = "复投规则";
    console.log(this.$route.query);
    
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  padding: 0.28rem 0.17rem;
  display: flex;
  flex-direction: column;
  align-items: center;

}
</style>
