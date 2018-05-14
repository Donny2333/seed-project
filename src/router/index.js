import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'
import Home from '../views/home/Home'
import Flow from '../views/form/Flow'
import RunOut from '../views/form/RunOut'
import Registry from '../views/form/Registry'
import Review from '../views/form/Review'
import Bespeak from '../views/form/Bespeak'
import Stages from '../views/form/Stages'
import Grant from '../views/form/Grant'
import Discount from '../views/form/Discount'
import Result from '../views/form/Result'

export const constantRouterMap = [{
  path: '/',
  name: '/',
  component: Layout,
  redirect: '/home',
  children: [{
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '中端学员对接页面'
    }
  }, {
    path: '/flow',
    name: 'Flow',
    component: Flow,
    meta: {
      title: '学员基本情况咨询'
    }
  }, {
    path: '/runOut',
    name: 'RunOut',
    component: RunOut,
    meta: {
      title: '实时考位信息查询'
    }
  }, {
    path: '/registry',
    name: 'Registry',
    component: Registry,
    meta: {
      title: '实时新生报考信息'
    }
  }, {
    path: '/review',
    name: 'Review',
    component: Review,
    meta: {
      title: '新生报考初审系统'
    }
  }, {
    path: '/bespeak',
    name: 'Bespeak',
    component: Bespeak,
    meta: {
      title: '分校预约系统'
    }
  }, {
    path: '/stages',
    name: 'Stages',
    component: Stages,
    meta: {
      title: '学费分期申请系统'
    }
  }, {
    path: '/grant',
    name: 'Grant',
    component: Grant,
    meta: {
      title: '助学金申请系统'
    }
  }, {
    path: '/discount',
    name: 'Discount',
    component: Discount,
    meta: {
      title: '优惠券申请系统'
    }
  }, {
    path: '/result/',
    name: 'Result',
    component: Result
  }]
}]

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
