import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Main from '../components/Main.vue'
import Login from '../components/auth/Login.vue'
import Registration from '../components/auth/Registration.vue'
import CreateTour from '../components/tours/CreateTour.vue'
import FetchIncomingTours from '../components/tours/FetchIncomingTours.vue'
import EditIncomingTours from '../components/tours/EditIncomingTour.vue'
import FetchOutgoingTours from '../components/tours/FetchOutgoingTours.vue'
import EditOutgoingTours from '../components/tours/EditOutgoingTour.vue'
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
      component: Registration,
      beforeEnter: AuthGuard
    },
    {
      path: '/create_tour',
      name: 'CreateTour',
      component: CreateTour,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/incoming-tours',
      name: 'FetchIncomingTours',
      component: FetchIncomingTours,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/incoming-tours/:id',
      name: 'EditIncomingTours',
      component: EditIncomingTours,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/outgoing-tours',
      name: 'FetchOutgoingTours',
      component: FetchOutgoingTours,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/outgoing-tours/:id',
      name: 'EditOutgoingTours',
      component: EditOutgoingTours,
      beforeEnter: AuthGuard
    },
    {
      path: '/create_daily_tour',
      name: 'CreateDailyTour',
      component: CreateDailyTour,
      beforeEnter: AuthGuard
    },
    {
      path: '/create_soc_package',
      name: 'CreateSocPackage',
      component: CreateSocPackage,
      beforeEnter: AuthGuard
    },
    {
      path: '/create_sight',
      name: 'CreateSight',
      component: CreateSight,
      beforeEnter: AuthGuard
    }
  ]
})
