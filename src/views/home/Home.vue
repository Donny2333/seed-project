<template>
  <div class="table">
    <div class="cell" v-for="(cell, index) in table" :key="index">
      <div class="cell-content">
        <mt-button type="primary" plain @click.native="handleClick(cell.router)">{{cell.name}}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      table: [
        {
          name: '按需流程',
          router: 'flow'
        },
        // {
        //   name: '考位信息',
        //   router: 'runOut'
        // },
        {
          name: '新生注册',
          router: 'registry'
        },
        {
          name: '报名初审',
          router: 'review'
        },
        {
          name: '预约分校',
          router: 'bespeak'
        },
        {
          name: '申请分期',
          router: 'stages'
        },
        // {
        //   name: '申请助学金',
        //   router: 'grant'
        // },
        {
          name: '申请优惠',
          router: 'discount'
        }
      ]
    }
  },
  methods: {
    handleClick: function(router) {
      this.$router.push(router)
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.table {
  height: 100%;
  width: 100%;
  padding: 5px;

  .cell {
    position: relative;
    height: 50px;
    width: 33%;
    display: inline-block;
    margin: 0 auto;

    .cell-content {
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        font-size: 16px;
        width: 108px;
      }
    }
  }
}
</style>

