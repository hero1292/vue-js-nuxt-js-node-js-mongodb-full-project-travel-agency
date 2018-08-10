import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Main from '../components/Main.vue'
import Login from '../components/auth/Login.vue'
import Registration from '../components/auth/Registration.vue'
import CreateTour from '../components/tours/CreateTour.vue'
import CreateDailyTour from '../components/daily_tours/CreateDailyTour.vue'
import CreateSocPackage from '../components/soc_packages/CreateSocPackage.vue'
import CreateSight from '../components/sights/CreateSight.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Reg',
      component: Registration
    },
    {
      path: '/create_tour',
      name: 'CreateTour',
      component: CreateTour
    },
    {
      path: '/create_daily_tour',
      name: 'CreateDailyTour',
      component: CreateDailyTour
    },
    {
      path: '/create_soc_package',
      name: 'CreateSocPackage',
      component: CreateSocPackage
    },
    {
      path: '/create_sight',
      name: 'CreateSight',
      component: CreateSight
    }
  ]
})
