import Vue from 'vue'
import Mint from 'mint-ui'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'

import 'mint-ui/lib/style.css'
import '@/style/index.less'

Vue.use(Mint)
Vue.use(VeeValidate, {
  locale: 'zh_CN',
  dictionary: {
    zh_CN: {
      messages: {
        email: () => '请输入正确的邮箱格式',
        required: (field) => '＊请输入' + field
      },
      attributes: {
        email: '邮箱',
        password: '密码',
        name: '姓名',
        telphone: '手机号',
        area: '地区',
        job: '工作',
        age: '年龄',
        birthplace: '户籍',
        intention: '意向',
        address: '家庭住址',
        regArea: '报考地区',
        subject: '专业',
        orderTime: '预约时间',
        schoolAddr: '分校地址',
        scholarship: '助学金金额'
      }
    }
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: {
    App
  }
})
