<template>
  <div class="course-query">
    <mt-cell title="封班截止时间" :value="deadline" is-link>
      <div style="z-index: 2000" @click="openPicker()">{{deadline}}</div>
      <mt-datetime-picker ref="picker" type="date" v-model="datePicker" @confirm="handleConfirm" />
    </mt-cell>

    <mt-cell title="报考地区" :value="regArea.value" is-link>
      <div style="z-index: 2000" @click="popup(regArea)">{{regArea.value && regArea.value.value}}</div>
      <mt-popup v-model="regArea.showPopup" position="bottom">
        <mt-picker :slots="regArea.slots" v-model="regArea.value" value-key="value" @change="onRegAreaChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="院校" :value="academy.value" is-link>
      <div style="z-index: 2000" @click="popup(academy)">{{academy.value && academy.value.value}}</div>
      <mt-popup v-model="academy.showPopup" position="bottom">
        <mt-picker :slots="academy.slots" v-model="academy.value" value-key="value" @change="onAcademyChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="专业" :value="subject.value" is-link>
      <div style="z-index: 2000" @click="popup(subject)">{{subject.value && subject.value.value}}</div>
      <mt-popup v-model="subject.showPopup" position="bottom">
        <mt-picker :slots="subject.slots" v-model="subject.value" value-key="value" @change="onSubjectChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="班型" :value="classType.value" is-link>
      <div style="z-index: 2000" @click="popup(classType)">{{classType.value && (classType.value.itemName)}}</div>
      <mt-popup v-model="classType.showPopup" position="bottom">
        <mt-picker :slots="classType.slots" v-model="classType.value" value-key="itemName" @change="onClassTypeChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <div class="submit">
      <mt-button type="primary" @click="submit">查询剩余开班名额</mt-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import * as moment from 'moment'
import { MessageBox } from 'mint-ui'

export default {
  data() {
    const cities = this.$store.state.cities
    const categories = this.$store.state.categories

    return {
      datePicker: moment()
        .add(2, 'days')
        .toDate(),
      deadline: moment()
        .add(2, 'days')
        .format('YYYY-MM-DD'),
      regArea: {
        value: cities[0],
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

      academy: {
        value: categories[0],
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: categories,
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },

      subject: {
        value: '',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: [],
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
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },

      quota: 100,
      assigned: 80
    }
  },
  mounted() {
    const routeParams = this.$route.params

    this.datePicker = routeParams.datePicker || this.datePicker
    this.deadline = routeParams.deadline || this.deadline
    this.regArea = routeParams.regArea || this.regArea
    this.academy = routeParams.academy || this.academy
    this.subject = routeParams.subject || this.subject
    this.classType = routeParams.classType || this.classType

    this.quota = routeParams.quota || this.quota
    this.assigned = routeParams.assigned || this.assigned

    if (this.categories.length) {
      this.getSubject(this.categories[0].id)
    }
  },
  watch: {
    cities(value) {
      this.regArea.value = value[0]
      this.regArea.slots[0].values = value
    },
    categories(value) {
      // 赋值院校
      this.academy.value = value[0]
      this.academy.slots[0].values = value

      // 赋值专业
      this.getSubject(value[0].id).then(_ => {
        // 赋值班型
        this.getClass({
          provinceId: this.regArea.value.id,
          categoryId: value[0].id,
          subjectId: this.subject.value.id
        })
      })
    },
    'regArea.value': function(value) {
      if (this.academy.value && this.subject.value) {
        this.getClass({
          provinceId: value.id,
          categoryId: this.academy.value.id,
          subjectId: this.subject.value.id
        })
      }
    },
    'academy.value': function(value) {
      this.getSubject(value.id).then(_ => {
        this.getClass({
          provinceId: this.regArea.value.id,
          categoryId: value.id,
          subjectId: this.subject.value.id
        })
      })
    },
    'subject.value': function(value) {
      this.getClass({
        provinceId: this.regArea.value.id,
        categoryId: this.academy.value.id,
        subjectId: value.id
      })
    }
  },
  computed: {
    ...mapGetters(['cities', 'categories']),
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
    getSubject(categoryId) {
      return request
        .get(
          process.env.BASE_API +
            '/major/v1/index/category-two?categoryId=' +
            categoryId
        )
        .then(res => {
          if (res.code === 200) {
            this.subject.value = res.data[0]
            this.subject.slots[0].values = res.data
          }
        })
    },
    getClass({ provinceId, categoryId, subjectId }) {
      return request
        .get(
          process.env.BASE_API +
            `/major/v1/index/search-major?provinceId=${provinceId}&categoryOneId=${categoryId}&categoryTwoId=${subjectId}`
        )
        .then(res => {
          if (res.code === 200) {
            this.classType.value = res.data[0]
            this.classType.slots[0].values = res.data
          }
        })
    },
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
      picker.getSlotValue(0) && (this.classType.value = picker.getSlotValue(0))
    },
    onRegAreaChange(picker, values) {
      picker.getSlotValue(0) && (this.regArea.value = picker.getSlotValue(0))
    },
    onAcademyChange(picker, values) {
      picker.getSlotValue(0) && (this.academy.value = picker.getSlotValue(0))
    },
    onSubjectChange(picker, values) {
      picker.getSlotValue(0) && (this.subject.value = picker.getSlotValue(0))
    },
    submit() {
      this.$validator.validate().then(result => {
        if (result) {
          MessageBox({
            title: `${this.regArea.value.value} ${this.academy.value.value} ${
              this.subject.value.value
            } ${this.classType.value.itemName}`,
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
