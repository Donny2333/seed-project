<template>
  <div class="course-setting">
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
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import * as moment from 'moment'
import { Toast } from 'mint-ui'

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
  mounted() {
    if (this.categories.length) {
      this.getSubject(this.categories[0].id)
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
        if (!result) {
          Toast({
            message: '提交失败',
            iconClass: 'mintui mint-toast-icon mintui-field-warning'
          })
        } else {
          this.$router.replace({
            name: 'CourseQuery',
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
  }
}
</script>
