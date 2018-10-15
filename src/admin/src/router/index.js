import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth_guard'
import SpecialAuthGuard from './special_auth_guard'
import Main from '../components/Main.vue'
import Login from '../components/auth/Login.vue'
import MainForm from '../components/create/MainForm.vue'
import FetchSights from '../components/fetch/FetchSights.vue'
import EditSight from '../components/edit/EditSight.vue'
import FetchMessages from '../components/messages/Messages.vue'
import FetchOrders from '../components/orders/Orders.vue'
import FetchWorkers from '../components/auth/FetchWorkers.vue'
import EditWorker from '../components/auth/EditWorkers.vue'
import EditPassword from '../components/auth/EditPassword.vue'
import FetchTours from '../components/fetch/FetchTours.vue'
import EditTour from '../components/edit/EditTour.vue'

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
    },
    {
      path: '/:lang/:tours',
      name: 'FetchTours',
      component: FetchTours,
      beforeEnter: AuthGuard
    },
    {
      path: '/:lang/:tours/:id',
      name: 'EditTour',
      component: EditTour,
      beforeEnter: AuthGuard
    }
  ]
})
