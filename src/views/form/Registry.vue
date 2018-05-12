<template>
  <div>
    <mt-field label="地区" placeholder="请填写地区" v-model="area"></mt-field>
    <mt-field label="时间" placeholder="" readonly disableClear v-model="currentTime"></mt-field>
    <mt-field label="名额数" placeholder="13" readonly disableClear v-model="numberPlaces"></mt-field>
    <div class="submit">
      <mt-button type="primary">生成信息</mt-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

const formateOption = 'YYYY年MM月DD日HH时mm分ss秒'

export default {
  name: 'registry',
  data() {
    return {
      area: '',
      currentTime: moment(new Date()).format(formateOption),
      numberPlaces: 13
    }
  },
  created() {
    setInterval(() => {
      this.currentTime = moment(new Date()).format(formateOption)
    }, 1000)
  }
}
</script>

<style scoped>
.mint-popup {
  width: 100%;
}

.submit {
  width: 100%;
  padding: 10px;
}

.mint-button--primary {
  width: 100%;
  background-color: #1c51b3;
}
</style>
