<template>
  <div class="stage-setting">
    <mt-cell title="分期截止时间" :value="deadline" is-link>
      <div style="z-index: 2000" @click="openPicker()">{{deadline}}</div>
      <mt-datetime-picker ref="picker" type="date" v-model="datePicker" @confirm="handleConfirm" />
    </mt-cell>

    <mt-cell title="报考地区" :value="regArea.value" is-link>
      <div style="z-index: 2000" @click="popup(regArea)">{{regArea.value}}</div>
      <mt-popup v-model="regArea.showPopup" position="bottom">
        <mt-picker :slots="regArea.slots" v-model="regArea.value" @change="onRegAreaChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-field name="quota" v-validate="'required'" label="总名额" placeholder="请填写总名额" v-model="quota">
      <span class="validate" v-show="errors.has('quota')">{{ errors.first('quota') }}</span>
    </mt-field>
    <mt-field name="assigned" v-validate="'required'" label="已申请名额" placeholder="请填写已申请名额" v-model="assigned">
      <span class="validate" v-show="errors.has('assigned')">{{ errors.first('assigned') }}</span>
    </mt-field>
    <mt-field name="remain" v-validate="'required'" label="剩余名额" placeholder="请输入正确名额" v-model="remain" readonly>
      <span class="validate" v-show="errors.has('remain')">{{ errors.first('remain') }}</span>
    </mt-field>

    <div class="submit">
      <mt-button type="primary" @click="submit">下一步</mt-button>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
import { Toast } from 'mint-ui'

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
  computed: {
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
      this.$validator.validate().then(result => {
        if (!result) {
          Toast({
            message: '提交失败',
            iconClass: 'mintui mint-toast-icon mintui-field-warning'
          })
        } else {
          this.$router.replace({
            name: 'StageQuery',
            params: {
              datePicker: this.datePicker,
              deadline: this.deadline,
              regArea: this.regArea,
              quota: this.quota,
              assigned: this.assigned
            }
          })
        }
      })
    }
  }
}
</script>
