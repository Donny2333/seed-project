<template>
  <div>
    <mt-field name="area" v-validate="'required'" label="地区" placeholder="请填写地区" v-model="area">
      <span class="validate" v-show="errors.has('area')">{{ errors.first('area') }}</span>
    </mt-field>

    <mt-cell title="学历" :value="education.value" is-link>
      <div style="z-index: 2000" @click="popup(education)">{{education.value}}</div>
      <mt-popup v-model="education.showPopup" position="bottom">
        <mt-picker :slots="education.slots" @change="onEducationChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-field name="job" v-validate="'required'" label="工作" placeholder="请填写工作" v-model="job">
      <span class="validate" v-show="errors.has('job')">{{ errors.first('job') }}</span>
    </mt-field>
    <mt-field name="age" v-validate="'required'" label="年龄" placeholder="请填写年龄" v-model="age">
      <span class="validate" v-show="errors.has('age')">{{ errors.first('age') }}</span>
    </mt-field>
    <mt-field name="birthplace" v-validate="'required'" label="户籍" placeholder="请填写户籍" v-model="birthplace">
      <span class="validate" v-show="errors.has('birthplace')">{{ errors.first('birthplace') }}</span>
    </mt-field>

    <mt-cell title="考证目的" :value="purpose.value" is-link>
      <div style="z-index: 2000" @click="popup(purpose)">{{purpose.value}}</div>
      <mt-popup v-model="purpose.showPopup" position="bottom">
        <mt-picker :slots="purpose.slots" @change="onPurposeChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="学习时间" :value="studyTime.value" is-link>
      <div style="z-index: 2000" @click="popup(studyTime)">{{studyTime.value}}</div>
      <mt-popup v-model="studyTime.showPopup" position="bottom">
        <mt-picker :slots="studyTime.slots" @change="onStudyTimeChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="取证时间" :value="graduateTime.value" is-link>
      <div style="z-index: 2000" @click="popup(graduateTime)">{{graduateTime.value}}</div>
      <mt-popup v-model="graduateTime.showPopup" position="bottom">
        <mt-picker :slots="graduateTime.slots" @change="onGraduateTimeChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="学习能力" :value="ability.value" is-link>
      <div style="z-index: 2000" @click="popup(ability)">{{ability.value}}</div>
      <mt-popup v-model="ability.showPopup" position="bottom">
        <mt-picker :slots="ability.slots" @change="onAbilityChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-field name="intention" v-validate="'required'" label="意向" placeholder="请填写意向院校及专业" v-model="intention">
      <span class="validate" v-show="errors.has('intention')">{{ errors.first('intention') }}</span>
    </mt-field>
    <div class="submit">
      <mt-button type="primary" @click="submit">提交</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { create } from '@/api'

export default {
  name: 'flow',
  methods: {
    popup(template) {
      template.showPopup = true
    },
    onEducationChange(picker, values) {
      picker.getSlotValue(0) && (this.education.value = picker.getSlotValue(0))
    },
    onPurposeChange(picker, values) {
      picker.getSlotValue(0) && (this.purpose.value = picker.getSlotValue(0))
    },
    onStudyTimeChange(picker, values) {
      picker.getSlotValue(0) && (this.studyTime.value = picker.getSlotValue(0))
    },
    onGraduateTimeChange(picker, values) {
      picker.getSlotValue(0) &&
        (this.graduateTime.value = picker.getSlotValue(0))
    },
    onAbilityChange(picker, values) {
      picker.getSlotValue(0) && (this.ability.value = picker.getSlotValue(0))
    },
    submit() {
      this.$validator.validate().then(result => {
        if (!result) {
          Toast({
            message: '提交失败',
            iconClass: 'mintui mint-toast-icon mintui-field-warning'
          })
        } else {
          const form = {
            地区: this.area,
            学历: this.education.value,
            工作: this.job,
            年龄: this.age,
            户籍: this.birthplace,
            考证目的: this.purpose.value,
            学习时间: this.studyTime.value,
            取证时间: this.graduateTime.value,
            学习能力: this.ability.value,
            意向: this.intention
          }
          create(
            Object.assign(
              {
                system_id: '1'
              },
              form
            )
          ).then(
            res => {
              this.$router.replace({
                name: 'Result',
                params: {
                  title: this.$route.meta.title,
                  form: form
                }
              })
              Toast({
                message: '提交成功',
                iconClass: 'mintui mint-toast-icon mintui-success'
              })
            },
            err => {
              Toast({
                message: '提交失败：' + err,
                iconClass: 'mintui mint-toast-icon mintui-field-warning'
              })
            }
          )
        }
      })
    }
  },
  data() {
    return {
      area: '',
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
      job: '',
      age: '',
      birthplace: '',
      purpose: {
        value: '找工作',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['找工作', '升值加薪', '自我提升', '积分落户', '其他'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      studyTime: {
        value: '多',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['多', '少', '只有周末'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      graduateTime: {
        value: '简单快速',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['简单快速', '一年', '两年', '三年及以上'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      ability: {
        value: '数学差',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['数学差', '英语差', '数学英语都差', '学习能力强'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      intention: ''
    }
  }
}
</script>
