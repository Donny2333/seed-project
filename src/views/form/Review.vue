<template>
  <div>
    <mt-field label="姓名" placeholder="" v-model="name"></mt-field>
    <mt-field label="手机号" placeholder="" v-model="telphone"></mt-field>
    <mt-field label="身份证号" placeholder="" v-model="IDs"></mt-field>
    <mt-field label="家庭住址" placeholder="" v-model="homeAddress"></mt-field>
    <mt-field label="报考地区" placeholder="" v-model="regArea"></mt-field>
    <div class="submit">
      <mt-button type="primary">生成基本信息</mt-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'flow',
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
