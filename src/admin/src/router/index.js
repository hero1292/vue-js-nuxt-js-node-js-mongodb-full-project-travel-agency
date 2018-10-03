import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth_guard'
import SpecialAuthGuard from './special_auth_guard'
import Main from '../components/Main.vue'
import Login from '../components/auth/Login.vue'
import MainForm from '../components/create/MainForm.vue'
import FetchIncomingTours from '../components/fetch/FetchIncomingTours.vue'
import EditIncomingTour from '../components/edit/EditIncomingTour.vue'
import FetchOutgoingTours from '../components/fetch/FetchOutgoingTours.vue'
import EditOutgoingTour from '../components/edit/EditOutgoingTour.vue'
import FetchDailyTours from '../components/fetch/FetchDailyTours.vue'
import EditDailyTour from '../components/edit/EditDailyTour.vue'
import FetchSights from '../components/fetch/FetchSights.vue'
import EditSight from '../components/edit/EditSight.vue'
import FetchMessages from '../components/messages/Messages.vue'
import FetchOrders from '../components/orders/Orders.vue'
import FetchWorkers from '../components/auth/FetchWorkers.vue'
import EditWorker from '../components/auth/EditWorkers.vue'
import EditPassword from '../components/auth/EditPassword.vue'

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
      path: '/create',
      name: 'MainForm',
      component: MainForm,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/incoming_tours',
      name: 'FetchIncomingTours',
      component: FetchIncomingTours,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/incoming_tours/:id',
      name: 'EditIncomingTours',
      component: EditIncomingTour,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/outgoing_tours',
      name: 'FetchOutgoingTours',
      component: FetchOutgoingTours,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/outgoing_tours/:id',
      name: 'EditOutgoingTours',
      component: EditOutgoingTour,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/daily_tours',
      name: 'FetchDailyTours',
      component: FetchDailyTours,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/daily_tours/:id',
      name: 'EditDailyTours',
      component: EditDailyTour,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/sights',
      name: 'FetchSights',
      component: FetchSights,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/sights/:id',
      name: 'EditSight',
      component: EditSight,
      beforeEnter: AuthGuard
    },
    {
      path: '/messages',
      name: 'FetchMessages',
      component: FetchMessages,
      beforeEnter: AuthGuard
    },
    {
      path: '/orders',
      name: 'FetchOrders',
      component: FetchOrders,
      beforeEnter: AuthGuard
    },
    {
      path: '/workers',
      name: 'FetchWorkers',
      component: FetchWorkers,
      beforeEnter: SpecialAuthGuard
    },
    {
      path: '/workers/:id',
      name: 'EditWorker',
      component: EditWorker,
      beforeEnter: SpecialAuthGuard
    },
    {
      path: '/workers/change_password/:id',
      name: 'EditPassword',
      component: EditPassword,
      beforeEnter: SpecialAuthGuard
    }
  ]
})
