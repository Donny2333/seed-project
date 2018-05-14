<template>
  <div class='main'>
    <div class='head'>
      <img :src="logo" alt="尚德机构">
      <h2>{{title}}</h2>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import logo from '@/asset/img/logo.png'
export default {
  name: 'layout',
  data() {
    return {
      logo
    }
  },
  computed: {
    title() {
      return this.$route.meta.title || this.$route.params.title || ''
    }
  },
  mounted() {}
}
</script>

<style rel="stylesheet/less" lang="less">
.head {
  width: 100%;
  height: 90px;
  margin: 0 auto;
  background: url('../../asset/img/bg.jpg');
  color: white;
  display: flex;
  align-items: center;
  padding-left: 10px;

  img {
    margin-right: 10px;
  }
}
</style>
