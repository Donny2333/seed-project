<template>
  <div class="course-query">
    <mt-cell title="封班截止时间" :value="deadline" is-link>
      <div style="z-index: 2000" @click="openPicker()">{{deadline}}</div>
      <mt-datetime-picker ref="picker" type="date" v-model="datePicker" @confirm="handleConfirm" />
    </mt-cell>

    <mt-cell title="报考地区" :value="regArea.value" is-link>
      <div style="z-index: 2000" @click="popup(regArea)">{{regArea.value}}</div>
      <mt-popup v-model="regArea.showPopup" position="bottom">
        <mt-picker :slots="regArea.slots" v-model="regArea.value" @change="onRegAreaChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-field name="academy" v-validate="'required'" label="院校" placeholder="请填写院校" v-model="academy">
      <span class="validate" v-show="errors.has('academy')">{{ errors.first('academy') }}</span>
    </mt-field>
    <mt-field name="subject" v-validate="'required'" label="专业" placeholder="请填写专业" v-model="subject">
      <span class="validate" v-show="errors.has('subject')">{{ errors.first('subject') }}</span>
    </mt-field>

    <mt-cell title="班型" :value="classType.value" is-link>
      <div style="z-index: 2000" @click="popup(classType)">{{classType.value}}</div>
      <mt-popup v-model="classType.showPopup" position="bottom">
        <mt-picker ref="classTypePicker" :slots="classType.slots" :showToolbar="true" value-key="name" @change="onClassTypeChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <div class="submit">
      <mt-button type="primary" @click="submit">查询剩余开班名额</mt-button>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
import { MessageBox } from 'mint-ui'

export default {
  data() {
    const classType = this.$store.state.classType
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

      academy: '',
      subject: '',

      classType: {
        value: '',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: classType,
            defaultIndex: 10,
            className: 'slot1',
            textAlign: 'right'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 2,
            values: classType[0].childs,
            defaultIndex: 0,
            className: 'slot3',
            textAlign: 'left'
          }
        ]
      },
      classTypePicker: ['1', '1-1'],

      quota: 100,
      assigned: 80
    }
  },
  mounted() {
    const routeParams = this.$route.params

    this.datePicker = routeParams.datePicker || this.datePicker
    this.deadline = routeParams.deadline || this.deadline
    this.academy = routeParams.academy || this.academy
    this.subject = routeParams.subject || this.subject
    this.classTypePicker = routeParams.classTypePicker || this.classTypePicker
    this.quota = routeParams.quota || this.quota
    this.assigned = routeParams.assigned || this.assigned

    this.regArea.value =
      (routeParams.regArea && routeParams.regArea.value) || this.regArea.value
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
    onClassTypeChange(picker, values) {
      const classType = this.$store.state.classType

      if (!values[0]) {
        this.$nextTick(() => {
          picker.setValues([
            classType[this.classTypePicker[0] - 1],
            classType[this.classTypePicker[0] - 1].childs[
              this.classTypePicker[1].split('-')[1] - 1
            ]
          ])
        })
      } else {
        picker.setSlotValues(1, values[0].childs)
        this.classTypePicker = [
          picker.getSlotValue(0).id,
          picker.getSlotValue(1).id
        ]
        this.classType.value = [
          picker.getSlotValue(0).name,
          picker.getSlotValue(1).name
        ].join(' ')
      }
    },
    onDeadlineChange(picker, values) {
      picker.getSlotValue(0) && (this.deadline.value = picker.getSlotValue(0))
    },
    onRegAreaChange(picker, values) {
      picker.getSlotValue(0) && (this.regArea.value = picker.getSlotValue(0))
    },
    submit() {
      this.$validator.validate().then(result => {
        if (result) {
          MessageBox({
            title: `${this.regArea.value}地区 ${this.academy}院校 ${
              this.subject
            }专业 ${this.classType.value}班型`,
            message:
              `<div class="msgbox-deadline">(截止${this.deadline})</div>` +
              `<div class="msgbox-main">` +
              `<div>总名额：${this.quota}</div>` +
              `<div>已申请名额：${this.assigned}</div>` +
              `<div>剩余名额：<text style="color: red">${this.remain}</text>` +
              `</div>`,
            cancelButtonText: '知道了',
            confirmButtonText: '申请名额',
            showCancelButton: true
          }).then(action => {
            if (action === 'confirm') {
              this.$router.replace({
                name: 'CourseApply',
                params: {
                  datePicker: this.datePicker,
                  deadline: this.deadline,
                  regArea: this.regArea,
                  academy: this.academy,
                  subject: this.subject,
                  classType: this.classType,
                  classTypePicker: this.classTypePicker,
                  quota: this.quota,
                  assigned: this.assigned
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style>
.mint-msgbox-title {
  padding: 0 20px;
}

.msgbox-deadline {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 28px;
}

.msgbox-main {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.647058823529412);
  width: 40%;
  text-align: left;
  display: inline-block;
  font-size: 14px;
  line-height: 28px;
}
</style>
