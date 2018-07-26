<template>
  <div class="course-apply">
    <mt-cell title="封班截止时间" :value="deadline" is-link>
      <div style="z-index: 2000" @click="openPicker()">{{deadline}}</div>
      <mt-datetime-picker ref="picker" type="date" v-model="datePicker" @confirm="handleConfirm" />
    </mt-cell>

    <mt-field name="name" v-validate="'required'" label="姓名" placeholder="请填写姓名" v-model="name">
      <span class="validate" v-show="errors.has('name')">{{ errors.first('name') }}</span>
    </mt-field>
    <mt-field name="telphone" v-validate="'required|phone'" label="手机号" placeholder="请填写手机号" type="tel" v-model="telphone">
      <span class="validate" v-show="errors.has('telphone')">{{ errors.first('telphone') }}</span>
    </mt-field>
    <mt-field name="IDs" v-validate="'required'" label="身份证号" placeholder="请填写身份证号" v-model="IDs">
      <span class="validate" v-show="errors.has('IDs')">{{ errors.first('IDs') }}</span>
    </mt-field>
    <mt-field name="birthplace" v-validate="'required'" label="户籍" placeholder="请填写户籍" v-model="birthplace">
      <span class="validate" v-show="errors.has('birthplace')">{{ errors.first('birthplace') }}</span>
    </mt-field>
    <mt-cell title="学历" :value="education.value" is-link>
      <div style="z-index: 2000" @click="popup(education)">{{education.value}}</div>
      <mt-popup v-model="education.showPopup" position="bottom">
        <mt-picker :slots="education.slots" @change="onEducationChange"></mt-picker>
      </mt-popup>
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
      <mt-button type="primary" @click="submit">申请开班名额</mt-button>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
import { Toast } from 'mint-ui'

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

      name: '',
      telphone: '',
      IDs: '',
      birthplace: '',
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

      education: {
        value: '高中',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['小学', '初中', '高中/中专', '大专', '本科', '硕士及以上'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },

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
      classTypePicker: ['1', '1-1']
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
    onEducationChange(picker, values) {
      picker.getSlotValue(0) && (this.education.value = picker.getSlotValue(0))
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
  }
}
</script>
