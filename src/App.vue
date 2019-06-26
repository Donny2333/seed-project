<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import request from '@/utils/request'

  export default {
    name: 'app',
    mounted() {
      this.getProvince()
      this.getCategory()
    },
    methods: {
      getProvince() {
        request.get(process.env.BASE_API + '/major/v1/index/province').then(res => {
          if (res.code === 200) {
            this.$store.dispatch('SetCity', res.data)
          }
        })
      },
      getCategory() {
        request.get(process.env.BASE_API + '/major/v1/index/category-one').then(res => {
          if (res.code === 200) {
            this.$store.dispatch('SetCategory', res.data)
          }
        })
      }
    }
  }
</script>
