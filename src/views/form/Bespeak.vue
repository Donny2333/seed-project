<template>
  <div>
    <mt-field name="name" v-validate="'required'" label="姓名" placeholder="请填写姓名" v-model="name">
      <span class="validate" v-show="errors.has('name')">{{ errors.first('name') }}</span>
    </mt-field>
    <mt-field name="telphone" v-validate="'required|phone'" label="手机号" placeholder="请填写手机号" type="tel" v-model="telphone">
      <span class="validate" v-show="errors.has('telphone')">{{ errors.first('telphone') }}</span>
    </mt-field>
    <mt-field name="subject" v-validate="'required'" label="专业" placeholder="请填写专业" v-model="subject">
      <span class="validate" v-show="errors.has('subject')">{{ errors.first('subject') }}</span>
    </mt-field>
    <mt-cell title="班型" :value="classType.value" is-link>
      <div style="z-index: 2000" @click="popup(classType)">{{classType.value}}</div>
      <mt-popup v-model="classType.showPopup" position="bottom">
        <mt-picker :slots="classType.slots" @change="onClassTypeChange"></mt-picker>
      </mt-popup>
    </mt-cell>
    <mt-field name="orderTime" v-validate="'required'" label="预约时间" placeholder="请填写预约时间" v-model="orderTime">
      <span class="validate" v-show="errors.has('orderTime')">{{ errors.first('orderTime') }}</span>
    </mt-field>
    <mt-field name="schoolAddr" v-validate="'required'" label="分校地址" placeholder="请填写分校地址" v-model="regArea">
      <span class="validate" v-show="errors.has('schoolAddr')">{{ errors.first('schoolAddr') }}</span>
    </mt-field>
    <div class="submit">
      <mt-button type="primary" @click="submit">生成基本信息</mt-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'

export default {
  name: 'bespeak',
  data() {
    return {
      name: '',
      telphone: '',
      subject: '',
      // classType: '',
      orderTime: '',
      regArea: '',
      classType: {
        value: 5980,
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: [5980, 8980, 9800, 12480, 14800, 16800],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      }
    }
  },
  methods: {
    popup(template) {
      template.showPopup = true
    },
    onClassTypeChange(picker, values) {
      picker.getSlotValue(0) && (this.classType.value = picker.getSlotValue(0))
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
            姓名: this.name,
            手机号: this.telphone,
            专业: this.subject,
            班型: this.classType.value,
            预约时间: this.orderTime,
            分校地址: this.regArea
          }

          request
            .post(process.env.BASE_API + '/generaltools/api/record-log', {
              stu_mobile: this.telphone,
              source: '分校预约系统'
            })
            .then(res => {
              if (res.code === 200) {
                this.$router.replace({
                  name: 'Result',
                  params: {
                    title: this.$route.meta.title,
                    form: form
                  }
                })
                Indicator.close()
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
