import Vue from 'vue'
import VeeValidate, {
  Validator
} from 'vee-validate'

Vue.use(VeeValidate, {
  locale: 'zh_CN',
  dictionary: {
    zh_CN: {
      messages: {
        email: () => '请输入正确的邮箱格式',
        required: field => '＊请输入' + field,
        phone: field => `*${field}必须是11位`
      },
      attributes: {
        email: '邮箱',
        password: '密码',
        name: '姓名',
        telphone: '手机号',
        area: '地区',
        job: '工作',
        age: '年龄',
        IDs: '身份证号',
        birthplace: '户籍',
        intention: '意向',
        address: '家庭住址',
        regArea: '报考地区',
        subject: '专业',
        orderTime: '预约时间',
        schoolAddr: '分校地址',
        scholarship: '助学金金额'
      }
    }
  }
})

Validator.extend('phone', {
  validate: value => {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})
