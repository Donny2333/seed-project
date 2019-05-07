<template>
  <div>
    <mt-field name="name" v-validate="'required'" label="姓名" placeholder="请填写姓名" v-model="name">
      <span class="validate" v-show="errors.has('name')">{{ errors.first('name') }}</span>
    </mt-field>
    <mt-field name="telphone" v-validate="'required|phone'" label="手机号" placeholder="请填写手机号" type="tel" v-model="telphone">
      <span class="validate" v-show="errors.has('telphone')">{{ errors.first('telphone') }}</span>
    </mt-field>
    <mt-field name="IDs" v-validate="'required'" label="身份证号" placeholder="请填写身份证号" v-model="IDs">
      <span class="validate" v-show="errors.has('IDs')">{{ errors.first('IDs') }}</span>
    </mt-field>
    <mt-field name="province" v-validate="'required'" label="报考省份" placeholder="请填写报考省份" v-model="province">
      <span class="validate" v-show="errors.has('province')">{{ errors.first('province') }}</span>
    </mt-field>

    <mt-cell title="是否有考试违规记录" :value="exam.value" is-link>
      <div style="z-index: 2000" @click="popup(exam)">{{exam.value}}</div>
      <mt-popup v-model="exam.showPopup" position="bottom">
        <mt-picker :slots="exam.slots" @change="onPickerChange($event, exam)"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="是否有买证违规记录" :value="certificate.value" is-link>
      <div style="z-index: 2000" @click="popup(certificate)">{{certificate.value}}</div>
      <mt-popup v-model="certificate.showPopup" position="bottom">
        <mt-picker :slots="certificate.slots" @change="onPickerChange($event, certificate)"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="是否有不良犯罪记录" :value="crime.value" is-link>
      <div style="z-index: 2000" @click="popup(crime)">{{crime.value}}</div>
      <mt-popup v-model="crime.showPopup" position="bottom">
        <mt-picker :slots="crime.slots" @change="onPickerChange($event, crime)"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="是否有逾期及不良征信记录" :value="credit.value" is-link>
      <div style="z-index: 2000" @click="popup(credit)">{{credit.value}}</div>
      <mt-popup v-model="credit.showPopup" position="bottom">
        <mt-picker :slots="credit.slots" @change="onPickerChange($event, credit)"></mt-picker>
      </mt-popup>
    </mt-cell>

    <div class="submit">
      <mt-button type="primary" @click="submit">生成基本信息</mt-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'

export default {
  name: 'review',
  methods: {
    popup(template) {
      template.showPopup = true
    },
    onPickerChange(picker, template) {
      picker.getSlotValue(0) && (template.value = picker.getSlotValue(0))
    },
    submit() {
      this.$validator.validate().then(result => {
        if (!result) {
          Toast({
            message: '提交失败',
            iconClass: 'mintui mint-toast-icon mintui-field-warning'
          })
        } else {
          const mom = moment(new Date())
          const form = {
            姓名: this.name,
            手机号: this.telphone,
            身份证号: this.IDs,
            报考省份: this.province,
            审核结果: '审核通过，（学员审核结果：优秀，综合教育评分355）',
            审核明细: [
              '无考试违规记录',
              '无买证违规记录',
              '无不良犯罪记录',
              '无逾期及不良征信记录'
            ],
            初审编号: 'XSCS' + mom.format('YYYY_MDHms')
          }

          this.$router.replace({
            name: 'Result',
            params: {
              title: this.$route.meta.title,
              form: form,
              showDetail2: true
            }
          })
          Indicator.close()
          Toast({
            message: '提交成功',
            iconClass: 'mintui mint-toast-icon mintui-success'
          })
        }
      })
    }
  },
  data() {
    return {
      name: '',
      telphone: '',
      IDs: '',
      province: '',
      exam: {
        value: '否',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['否', '是'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      certificate: {
        value: '否',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['否', '是'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      crime: {
        value: '否',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['否', '是'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      credit: {
        value: '否',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['否', '是'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      }
    }
  }
}
</script>
