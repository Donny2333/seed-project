<template>
  <div class="state-query">
    <mt-cell title="分期截止时间" :value="deadline" is-link>
      <div style="z-index: 2000" @click="openPicker()">{{deadline}}</div>
      <mt-datetime-picker ref="picker" type="date" v-model="datePicker" @confirm="handleConfirm" />
    </mt-cell>

    <mt-cell title="报考地区" :value="regArea.value" is-link>
      <div style="z-index: 2000" @click="popup(regArea)">{{regArea.value.value}}</div>
      <mt-popup v-model="regArea.showPopup" position="bottom">
        <mt-picker :slots="regArea.slots" v-model="regArea.value" value-key="value" @change="onRegAreaChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <div class="submit">
      <mt-button type="primary" @click="submit">查询申请分期名额</mt-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as moment from 'moment'
import { MessageBox } from 'mint-ui'

export default {
  data() {
    const cities = this.$store.state.cities

    return {
      datePicker: moment()
        .add(2, 'days')
        .toDate(),
      deadline: moment()
        .add(2, 'days')
        .format('YYYY-MM-DD'),
      regArea: {
        value: '安徽',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: cities,
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      quota: 1000,
      assigned: 980
    }
  },
  mounted() {
    const routeParams = this.$route.params

    this.datePicker = routeParams.datePicker || this.datePicker
    this.deadline = routeParams.deadline || this.deadline
    this.quota = routeParams.quota || this.quota
    this.assigned = routeParams.assigned || this.assigned

    this.regArea.value =
      (routeParams.regArea && routeParams.regArea.value) || this.regArea.value
  },
  watch: {
    cities(value) {
      this.regArea.value = value[0]
      this.regArea.slots[0].values = value
    }
  },
  computed: {
    ...mapGetters(['cities']),
    remain: {
      get() {
        const remain = this.quota - this.assigned
        if (this.quota >= 0 && this.assigned >= 0 && remain >= 0) {
          return this.quota - this.assigned
        } else {
          return ''
        }
      },
      set() {}
    }
  },
  methods: {
    popup(template) {
      template.showPopup = true
    },
    openPicker() {
      this.$refs.picker.open()
    },
    handleConfirm(date) {
      this.deadline = moment(date).format('YYYY-MM-DD')
    },
    onRegAreaChange(picker, values) {
      picker.getSlotValue(0) && (this.regArea.value = picker.getSlotValue(0))
    },
    submit() {
      MessageBox({
        title: `${this.regArea.value.value}地区(截止${this.deadline})申请分期`,
        message:
          `<div class="msgbox-main">` +
          `<div>总名额：${this.quota}</div>` +
          `<div>已申请名额：${this.assigned}</div>` +
          `<div>剩余名额：<text style="color: red">${this.remain}</text></div>`,
        cancelButtonText: '知道了',
        confirmButtonText: '申请名额',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          this.$router.replace({
            name: 'StageRecord',
            params: {}
          })
        }
      })
    }
  }
}
</script>
