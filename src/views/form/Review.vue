<template>
  <div>
    <mt-field name="name" v-validate="'required'" label="姓名" placeholder="请填写姓名" v-model="name">
      <span class="validate" v-show="errors.has('name')">{{ errors.first('name') }}</span>
    </mt-field>
    <mt-field name="telphone" v-validate="'required'" label="手机号" placeholder="请填写手机号" type="tel" v-model="telphone">
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
import { Toast } from 'mint-ui'

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
      homeAddress: '',
      regArea: ''
    }
  }
}
</script>
