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
      <mt-button type="primary" @click="submit">申请开班名额</mt-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import * as moment from 'moment'
import { Toast } from 'mint-ui'
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

      name: '',
      telphone: '',
      IDs: '',
      birthplace: '',
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
      }
    }
  },
  computed: {
    ...mapGetters(['cities', 'categories']),
    deadtime() {
      return moment()
        .add(this.remainHour, 'hours')
        .format('YYYY年MM月DD日HH点mm分')
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
    const routeParams = this.$route.params

    this.datePicker = routeParams.datePicker || this.datePicker
    this.deadline = routeParams.deadline || this.deadline
    this.regArea = routeParams.regArea || this.regArea
    this.academy = routeParams.academy || this.academy
    this.subject = routeParams.subject || this.subject
    this.classType = routeParams.classType || this.classType

    this.quota = routeParams.quota || this.quota
    this.assigned = routeParams.assigned || this.assigned

    this.remainHour = this.$store.state.remainHour
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
    onEducationChange(picker, values) {
      picker.getSlotValue(0) && (this.education.value = picker.getSlotValue(0))
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
          request
            .post(process.env.BASE_API + '/generaltools/api/record-log', {
              stu_mobile: this.telphone,
              source: '开班名额申请'
            })
            .then(res => {
              if (res.code === 200) {
                MessageBox({
                  title: `${this.subject.value.value} 专业 ${
                    this.classType.value.itemName
                  } 申请成功`,
                  message: `<div class="msgbox-main"><div class="disc">此申请<span class="red">${
                    this.remainHour
                  }小时</span>内有效，请于<span class="red">${
                    this.deadtime
                  }</span>前完成分期手续。</div><div class="disc red">注：每个手机号只能申请一次请勿重复申请！由此带来不便，敬请谅解。</div></div>`
                })
                Toast({
                  message: '提交成功',
                  iconClass: 'mintui mint-toast-icon mintui-success'
                })
              } else {
                throw res
              }
            })
            .catch(e => {
              Toast({
                message: '录入失败',
                iconClass: 'mintui mint-toast-icon mintui-field-warning'
              })
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

.msgbox-main {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.647058823529412);
  width: 100%;
  text-align: left;
  display: inline-block;
  font-size: 14px;
  line-height: 20px;
}

.disc {
  padding: 0 2.5%;
  font-size: 12px;
  margin-bottom: 5px;
}

.red {
  color: red;
}
</style>
