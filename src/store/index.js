import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    remainHour: 12,
    cities: [
      '安徽',
      '北京',
      '福建',
      '广东',
      '广西',
      '贵州',
      '河北',
      '湖北',
      '黑龙江',
      '河南',
      '湖南',
      '吉林',
      '江苏',
      '江西',
      '辽宁',
      '宁夏',
      '四川',
      '陕西',
      '云南',
      '浙江'
    ],
    classType: [
      {
        id: '1',
        name: '单专/单本',
        childs: [
          {
            id: '1-1',
            name: '无忧黄金条款班 12480'
          },
          {
            id: '1-2',
            name: '政策保障班 9980'
          },
          {
            id: '1-3',
            name: 'AI不过退费班 8980'
          },
          {
            id: '1-4',
            name: '培优学年班 7480'
          },
          {
            id: '1-5',
            name: 'AI智能学习班 5890'
          }
        ]
      },
      {
        id: '2',
        name: '专本连读',
        childs: [
          {
            id: '2-1',
            name: '无忧黄金条款班 16800'
          },
          {
            id: '2-2',
            name: '政策保障班 14800'
          },
          {
            id: '2-3',
            name: 'AI不过退费班 13800'
          },
          {
            id: '2-4',
            name: '培优学年班 10800'
          },
          {
            id: '2-5',
            name: 'AI智能学习班 9800'
          }
        ]
      }
    ]
  },
  mutations: {
    SET_REMAIN_HOUR: (state, remainHour) => {
      state.remainHour = remainHour
    }
  },
  getters: {},
  actions: {
    SetRemainHour: ({ commit }, data) => {
      commit('SET_REMAIN_HOUR', data)
    }
  }
})

export default store
