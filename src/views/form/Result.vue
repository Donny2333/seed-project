<template>
  <div>
    <table width="95%" border="1">
      <tbody>
        <tr v-for="(value, key) in form" :key="key">
          <td height="40" width="30%" align="center" valign="middle">{{key}}</td>
          <td v-if="value.constructor===Array" style="padding-left: 20px; position: relative">
            <img class="tg" :src="tg">
            <ol>
              <li v-for="(item, index) in value" :key="index" style="padding: 5px 0">
                {{item}}
              </li>
            </ol>
          </td>
          <td v-else height="40" width="70%" align="center" valign="middle">
            {{value}}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showDetail">
      <div class="disc" @click="onClick">
        此申请<span class="red">{{remainHour}}小时</span>内有效，请于<span class="red">{{deadline}}</span>前完成分期手续。
      </div>
      <div class="disc red">注：每个手机号只能申请一次请勿重复申请！由此带来不便，敬请谅解。</div>
    </div>
    <div v-if="showDetail2">
      <div class="disc red">重要通知：尚德内部审核通过，审核结果于24小时 之内有效！</div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
import { MessageBox } from 'mint-ui'
import tg from '@/asset/img/tg.png'

export default {
  name: 'result',
  data() {
    return {
      tg,
      form: {},
      remainHour: 12,
      showDetail: false,
      showDetail2: false
    }
  },
  methods: {
    getData() {
      this.form = this.$route.params.form
      this.showDetail = this.$route.params.showDetail
      this.showDetail2 = this.$route.params.showDetail2
      this.remainHour = this.$store.state.remainHour
    },
    onClick() {
      MessageBox.prompt(' ', '分期时间设置')
        .then(({ value, action }) => {
          if (action === 'confirm' && value > 0) {
            this.remainHour = value
            this.$store.dispatch('SetRemainHour', value)
          }
        })
        .catch(() => {})
    }
  },
  computed: {
    deadline() {
      return moment()
        .add(this.remainHour, 'hours')
        .format('YYYY年MM月DD日HH点mm分')
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
.disc {
  padding: 0 2.5%;
  font-size: 12px;
  margin-bottom: 5px;
}

.red {
  color: red;
}
</style>
