import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: '/',
    component: () => import('../views/layout/Layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home/Home'),
        meta: { title: '中端学员对接页面' }
      },
      {
        path: '/flow',
        name: 'Flow',
        component: () => import('../views/form/Flow'),
        meta: { title: '学员基本情况咨询' }
      },
      {
        path: '/runOut',
        name: 'RunOut',
        component: () => import('../views/form/RunOut'),
        meta: { title: '实时考位信息查询' }
      },
      {
        path: '/registry',
        name: 'Registry',
        component: () => import('../views/form/Registry'),
        meta: { title: '实时新生报考信息' }
      },
      {
        path: '/review',
        name: 'Review',
        component: () => import('../views/form/Review'),
        meta: { title: '新生报考初审系统' }
      },
      {
        path: '/bespeak',
        name: 'Bespeak',
        component: () => import('../views/form/Bespeak'),
        meta: { title: '分校预约系统' }
      },
      {
        path: '/stage-setting',
        name: 'StageSetting',
        component: () => import('../views/form/StageSetting'),
        meta: { title: '申请分期名额设置' }
      },
      {
        path: '/stage-query',
        name: 'StageQuery',
        component: () => import('../views/form/StageQuery'),
        meta: { title: '申请分期名额查询' }
      },
      {
        path: '/stage-record',
        name: 'StageRecord',
        component: () => import('../views/form/StageRecord'),
        meta: { title: '学费分期申请系统' }
      },
      {
        path: '/grant',
        name: 'Grant',
        component: () => import('../views/form/Grant'),
        meta: { title: '助学金申请系统' }
      },
      {
        path: '/discount',
        name: 'Discount',
        component: () => import('../views/form/Discount'),
        meta: { title: '优惠券申请系统' }
      },
      {
        path: '/result/',
        name: 'Result',
        component: () => import('../views/form/Result')
      },
      {
        path: '/course-setting',
        name: 'CourseSetting',
        component: () => import('../views/form/CourseSetting'),
        meta: { title: '开班名额设置' }
      },
      {
        path: '/course-query',
        name: 'CourseQuery',
        component: () => import('../views/form/CourseQuery'),
        meta: { title: '开班名额查询' }
      },
      {
        path: '/course-apply',
        name: 'CourseApply',
        component: () => import('../views/form/CourseApply'),
        meta: { title: '开班名额申请' }
      }
    ]
  }]

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
