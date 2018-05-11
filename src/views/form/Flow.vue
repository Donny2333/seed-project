<template>
  <div>
    <mt-field label="地区" placeholder="请填写地区" v-model="area"></mt-field>

    <mt-cell title="学历" :value="education.value" is-link>
      <div style="z-index: 2000" @click="popup(education)">{{education.value}}</div>
      <mt-popup v-model="education.showPopup" position="bottom">
        <mt-picker :slots="education.slots" @change="onEducationChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-field label="工作" placeholder="请填写工作" v-model="job"></mt-field>
    <mt-field label="年龄" placeholder="请填写年龄" v-model="age"></mt-field>
    <mt-field label="户籍" placeholder="请填写户籍" v-model="birthplace"></mt-field>

    <mt-cell title="考证目的" :value="purpose.value" is-link>
      <div style="z-index: 2000" @click="popup(purpose)">{{purpose.value}}</div>
      <mt-popup v-model="purpose.showPopup" position="bottom">
        <mt-picker :slots="purpose.slots" @change="onPurposeChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="学习时间" :value="studyTime.value" is-link>
      <div style="z-index: 2000" @click="popup(studyTime)">{{studyTime.value}}</div>
      <mt-popup v-model="studyTime.showPopup" position="bottom">
        <mt-picker :slots="studyTime.slots" @change="onStudyTimeChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="取证时间" :value="graduateTime.value" is-link>
      <div style="z-index: 2000" @click="popup(graduateTime)">{{graduateTime.value}}</div>
      <mt-popup v-model="graduateTime.showPopup" position="bottom">
        <mt-picker :slots="graduateTime.slots" @change="onGraduateTimeChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-cell title="学习能力" :value="ability.value" is-link>
      <div style="z-index: 2000" @click="popup(ability)">{{ability.value}}</div>
      <mt-popup v-model="ability.showPopup" position="bottom">
        <mt-picker :slots="ability.slots" @change="onAbilityChange"></mt-picker>
      </mt-popup>
    </mt-cell>

    <mt-field label="意向" placeholder="请填写意向院校及专业" v-model="intention"></mt-field>
    <div class="submit">
      <mt-button type="primary">提交</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flow',
  methods: {
    popup: function(template) {
      template.showPopup = true
    },
    onEducationChange(picker, values) {
      picker.getSlotValue(0) && (this.education.value = picker.getSlotValue(0))
    },
    onPurposeChange(picker, values) {
      picker.getSlotValue(0) && (this.purpose.value = picker.getSlotValue(0))
    },
    onStudyTimeChange(picker, values) {
      picker.getSlotValue(0) && (this.studyTime.value = picker.getSlotValue(0))
    },
    onGraduateTimeChange(picker, values) {
      picker.getSlotValue(0) &&
        (this.graduateTime.value = picker.getSlotValue(0))
    },
    onAbilityChange(picker, values) {
      picker.getSlotValue(0) && (this.ability.value = picker.getSlotValue(0))
    }
  },
  data() {
    return {
      area: '',
      education: {
        value: '高中',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['小学', '初中', '高中/中专', '大专', '本科', '硕士及以上'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      job: '',
      age: '',
      birthplace: '',
      purpose: {
        value: '找工作',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['找工作', '升值加薪', '自我提升', '积分落户', '其他'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      studyTime: {
        value: '多',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['多', '少', '只有周末'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      graduateTime: {
        value: '简单快速',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['简单快速', '一年', '两年', '三年及以上'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      ability: {
        value: '数学差',
        showPopup: false,
        slots: [
          {
            flex: 1,
            values: ['数学差', '英语差', '数学英语都差', '学习能力强'],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      },
      intention: ''
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
