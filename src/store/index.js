import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    remainHour: 12,
    cities: [],
    categories: []
  },
  mutations: {
    SET_CITY: (state, cities) => {
      state.cities = cities
    },
    SET_CATEGORY: (state, categories) => {
      state.categories = categories
    },
    SET_REMAIN_HOUR: (state, remainHour) => {
      state.remainHour = remainHour
    }
  },
  getters: {
    cities: state => state.cities,
    categories: state => state.categories
  },
  actions: {
    SetCity: ({ commit }, data) => {
      commit('SET_CITY', data)
    },
    SetCategory: ({ commit }, data) => {
      commit('SET_CATEGORY', data)
    },
    SetRemainHour: ({ commit }, data) => {
      commit('SET_REMAIN_HOUR', data)
    }
  }
})

export default store
