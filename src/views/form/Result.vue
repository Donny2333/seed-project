<template>
  <table width="95%" border="1">
    <tbody>
      <tr v-for="(value, key) in form" :key="key">
        <td height="40" width="30%" align="center" valign="middle">{{key}}</td>
        <td v-if="value.constructor===Array" style="padding-left: 20px">
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
</template>

<script>
import tg from '@/asset/img/tg.png'

export default {
  name: 'result',
  data() {
    return {
      tg,
      form: {}
    }
  },
  methods: {
    getData() {
      this.form = this.$route.params.form
    }
  },
  created() {
    this.getData()
  }
}
</script>
