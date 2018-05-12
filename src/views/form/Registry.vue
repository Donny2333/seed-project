<template>
  <div>
    <mt-field name="area" v-validate="'required'" label="地区" placeholder="请填写地区" v-model="area">
      <span class="validate" v-show="errors.has('area')">{{ errors.first('area') }}</span>
    </mt-field>
    <mt-field label="时间" placeholder="" readonly disableClear v-model="currentTime"></mt-field>
    <mt-field label="名额数" placeholder="13" readonly disableClear v-model="numberPlaces"></mt-field>
    <div class="submit">
      <mt-button type="primary" @click="submit">生成信息</mt-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Toast } from 'mint-ui'

const formateOption = 'YYYY年MM月DD日HH时mm分ss秒'

export default {
  name: 'registry',
  methods: {
    submit() {
      this.$validator.validate().then(result => {
        if (!result) {
          Toast({
            message: '提交失败',
            iconClass: 'mintui mint-toast-icon mintui-field-warning'
          })
        } else {
          Toast({
            message: '提交成功',
            iconClass: 'mintui mint-toast-icon mintui-success'
          })
        }
      })
    }
  },
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
