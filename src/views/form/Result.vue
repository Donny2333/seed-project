<template>
    <table width="95%" border="1">
        <tbody>
            <tr v-for="(value, key) in form" :key="key">
                <td height="40" width="30%" align="center" valign="middle">{{key}}</td>
                <td height="40" width="70%" align="center" valign="middle">{{value}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  name: 'result',
  data() {
    return {
      form: {}
    }
  },
  methods: {
    getData() {
      this.form = this.$route.params.form || {
        地区: '1',
        工作: '2',
        年龄: '3',
        户籍: '4'
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>
