<template>
  <div>
    <mt-field name="name" v-validate="'required'" label="姓名" placeholder="请填写姓名" v-model="name">
      <span class="validate" v-show="errors.has('name')">{{ errors.first('name') }}</span>
    </mt-field>
    <mt-field name="area" v-validate="'required'" label="地区" placeholder="请填写地区" v-model="area">
      <span class="validate" v-show="errors.has('area')">{{ errors.first('area') }}</span>
    </mt-field>
    <mt-field name="telphone" v-validate="'required|phone'" label="手机号" placeholder="请填写手机号" type="tel" v-model="telphone">
      <span class="validate" v-show="errors.has('telphone')">{{ errors.first('telphone') }}</span>
    </mt-field>
    <mt-cell title="申请原因" :value="applyReason.value" is-link>
      <div style="z-index: 2000" @click="popup(applyReason)">{{applyReason.value}}</div>
      <mt-popup v-model="applyReason.showPopup" position="bottom">
        <mt-picker :slots="applyReason.slots" @change="onApplyReasonChange"></mt-picker>
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
import { create } from '@/api'

export default {
  name: 'stages',
  data() {
    return {
      name: '',
      telphone: '',
      area: '',
      applyReason: {
        value: '家庭贫困',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['家庭贫困', '经济紧张', '还款压力大', '其他'],
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
    onApplyReasonChange(picker, values) {
      picker.getSlotValue(0) &&
        (this.applyReason.value = picker.getSlotValue(0))
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
            地区: this.area,
            手机号: this.telphone,
            申请原因: this.applyReason.value,
            申请状态: [
              mom.add(1, 'M').add(35, 'S').format('H时m分s秒，系统初审通过'),
              mom.add(4, 'M').add(62, 'S').format('H时m分s秒，部门负责人审核通过'),
              mom.add(10, 'M').add(125, 'S').format('H时m分s秒，财务部审核批准')
            ],
            分期码编号: 'FQM' + mom.format('YYYY_MDHms')
          }

          create(
            Object.assign(
              {
                system_id: '6'
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
  }
}
</script>
