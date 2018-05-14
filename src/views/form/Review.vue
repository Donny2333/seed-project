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
    <mt-field name="address" v-validate="'required'" label="家庭住址" placeholder="请填写家庭住址" v-model="homeAddress">
      <span class="validate" v-show="errors.has('address')">{{ errors.first('address') }}</span>
    </mt-field>
    <mt-field name="regArea" v-validate="'required'" label="报考地区" placeholder="请填写报考地区" v-model="regArea">
      <span class="validate" v-show="errors.has('regArea')">{{ errors.first('regArea') }}</span>
    </mt-field>
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
  name: 'review',
  methods: {
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
            家庭住址: this.homeAddress,
            报考地区: this.regArea,
            申请状态: [
              mom.add(1, 'M').add(35, 'S').format('H时m分s秒，系统初审通过'),
              mom.add(4, 'M').add(62, 'S').format('H时m分s秒，部门负责人审核通过'),
              mom.add(7, 'M').add(97, 'S').format('H时m分s秒，公益服务部审核通过'),
              mom.add(10, 'M').add(125, 'S').format('H时m分s秒，财务部审核批准')
            ],
            初审编号: 'XSCS' + mom.format('YYYY_MDHms')
          }

          create(
            Object.assign(
              {
                system_id: '4'
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
      name: '',
      telphone: '',
      IDs: '',
      homeAddress: '',
      regArea: ''
    }
  }
}
</script>
