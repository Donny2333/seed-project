<template>
  <div>
    <mt-field label="姓名" placeholder="" v-model="name"></mt-field>
    <mt-field label="地区" placeholder="" v-model="regArea"></mt-field>
    <mt-field label="手机号" placeholder="" type="tel" v-model="telphone"></mt-field>
    <mt-cell title="优惠券额度" :value="discountQuota.value" is-link>
      <div style="z-index: 2000" @click="popup(discountQuota)">{{discountQuota.value}}</div>
      <mt-popup v-model="discountQuota.showPopup" position="bottom">
        <mt-picker :slots="discountQuota.slots" @change="onDiscountQuotaChange"></mt-picker>
      </mt-popup>
    </mt-cell>
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
  name: 'discount',
  data() {
    return {
      name: '',
      telphone: '',
      regArea: '',
      discountQuota: {
        value: '200',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['200', '800', '1000', '九折', '八五折', '八折', '七折'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      applyReason: {
        value: '家庭贫困',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['家庭贫困', '经济紧张', '工作时间短', '还款压力大', '在校生', '军人', '宝妈', '其他'],
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
    },
    onDiscountQuotaChange(picker, values) {
      picker.getSlotValue(0) && (this.discountQuota.value = picker.getSlotValue(0))
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
