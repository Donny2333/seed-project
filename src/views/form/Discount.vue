<template>
  <div>
    <mt-field label="姓名" placeholder="" v-model="name"></mt-field>
    <mt-field label="地区" placeholder="" v-model="regArea"></mt-field>
    <mt-field label="手机号" placeholder="" type="tel" v-model="telphone"></mt-field>
    <mt-radio
      title="优惠券额度"
      align="right"
      v-model="discountQuota"
      :options="['200', '800', '1000', '九折', '八五折', '八折', '七折']">
    </mt-radio>
    <mt-radio
      title="申请原因"
      align="right"
      v-model="applyReason"
      :options="['家庭贫困', '经济紧张', '工作时间短', '还款压力大', '在校生', '军人', '宝妈', '其他']">
    </mt-radio>
    <div class="submit">
      <mt-button type="primary">生成基本信息</mt-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'discount',
  data() {
    return {
      name: '',
      telphone: '',
      regArea: '',
      discountQuota: '',
      applyReason: ''
    }
  }
}
</script>

<style scoped>
.mint-popup {
  width: 100%;
}

.submit {
  width: 100%;
  padding: 10px;
}

.mint-button--primary {
  width: 100%;
  background-color: #1c51b3;
}
</style>
