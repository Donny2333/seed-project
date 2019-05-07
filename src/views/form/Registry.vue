<template>
  <div>
    <mt-field name="area" v-validate="'required'" label="地区" placeholder="请填写地区" v-model="area">
      <span class="validate" v-show="errors.has('area')">{{ errors.first('area') }}</span>
    </mt-field>
    <mt-field label="时间" placeholder="" readonly disableClear v-model="currentTime"></mt-field>
    <mt-field label="名额数" placeholder="13" readonly disableClear v-model="numberPlaces"></mt-field>
    <div class="submit">
      <mt-button type="primary" @click="submit" :disabled="disabled">{{this.btnText}}</mt-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'

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
          this.timer && clearInterval(this.timer)

          this.disabled = true
          this.btnText = '考位名额紧张，请尽快确认报考'
          Indicator.close()
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
      disabled: false,
      btnText: '生成信息',
      currentTime: moment(new Date()).format(formateOption),
      numberPlaces: 13,
      timer: null
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.currentTime = moment(new Date()).format(formateOption)
    }, 1000)
  }
}
</script>
