<template>
  <div>
    <mt-field label="姓名" placeholder="" v-model="name"></mt-field>
    <mt-field label="电话" placeholder="" type="tel" v-model="telphone"></mt-field>
    <mt-field label="专业" placeholder="" v-model="subject"></mt-field>
    <mt-cell title="班型" :value="classType.value" is-link>
      <div style="z-index: 2000" @click="popup(classType)">{{classType.value}}</div>
      <mt-popup v-model="classType.showPopup" position="bottom">
        <mt-picker :slots="classType.slots" @change="onClassTypeChange"></mt-picker>
      </mt-popup>
    </mt-cell>
    <mt-field label="预约时间" placeholder="" v-model="orderTime"></mt-field>
    <mt-field label="分校地址" placeholder="" v-model="regArea"></mt-field>
    <div class="submit">
      <mt-button type="primary">生成基本信息</mt-button>
    </div>
  </div>
</template>

<script>

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
        value: '4980',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['4980', '7980', '8800', '12800', '15960'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      }
    }
  },
  methods: {
    popup: function(template) {
      template.showPopup = true
    },
    onClassTypeChange(picker, values) {
      picker.getSlotValue(0) && (this.classType.value = picker.getSlotValue(0))
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
