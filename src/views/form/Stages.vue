<template>
  <div>
    <mt-field label="姓名" placeholder="" v-model="name"></mt-field>
    <mt-field label="地区" placeholder="" v-model="regArea"></mt-field>
    <mt-field label="手机号" placeholder="" type="tel" v-model="telphone"></mt-field>
    <mt-cell title="申请原因" :value="applyReason.value" is-link>
      <div style="z-index: 2000" @click="popup(applyReason)">{{applyReason.value}}</div>
      <mt-popup v-model="applyReason.showPopup" position="bottom">
        <mt-picker :slots="applyReason.slots" @change="onApplyReasonChange"></mt-picker>
      </mt-popup>
    </mt-cell>
    <div class="submit">
      <mt-button type="primary">生成基本信息</mt-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'stages',
  data() {
    return {
      name: '',
      telphone: '',
      regArea: '',
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
    popup: function(template) {
      template.showPopup = true
    },
    onApplyReasonChange(picker, values) {
      picker.getSlotValue(0) && (this.applyReason.value = picker.getSlotValue(0))
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
