import Vue from 'vue'
import Mint from 'mint-ui'
import App from './App'
import router from './router'

import 'mint-ui/lib/style.css'
import '@/style/index.less'

import '@/components/VeeValidate'

Vue.use(Mint)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: {
    App
  }
})
