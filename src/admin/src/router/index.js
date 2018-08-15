import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Main from '../components/Main.vue'
import Login from '../components/auth/Login.vue'
import Registration from '../components/auth/Registration.vue'
import CreateTour from '../components/tours/CreateTour.vue'
import FetchIncomingTours from '../components/tours/FetchIncomingTours.vue'
import EditIncomingTour from '../components/tours/EditIncomingTour.vue'
import FetchOutgoingTours from '../components/tours/FetchOutgoingTours.vue'
import EditOutgoingTour from '../components/tours/EditOutgoingTour.vue'
import FetchDailyTours from '../components/daily_tours/FetchDailyTours.vue'
import EditDailyTour from '../components/daily_tours/EditDailyTour.vue'
import CreateHotel from '../components/soc_packages/CreateSocPackage.vue'
import SocPackages from '../components/soc_packages/FetchSocPackages.vue'
import EditHotel from '../components/soc_packages/EditSocPackage.vue'
import CreateSight from '../components/sights/CreateSight.vue'
import FetchSights from '../components/sights/FetchSights.vue'
import EditSight from '../components/sights/EditSight.vue'
import FetchMessages from '../components/messages/Messages.vue'
import FetchOrders from '../components/orders/Orders.vue'

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
      path: '/create_hotel',
      name: 'CreateHotel',
      component: CreateHotel,
      beforeEnter: AuthGuard
    },
    {
      path: '/soc_packages',
      name: 'SocPackages',
      component: SocPackages,
      beforeEnter: AuthGuard
    },
    {
      path: '/soc_packages/:id',
      name: 'EditHotel',
      component: EditHotel,
      beforeEnter: AuthGuard
    },
    {
      path: '/create_sight',
      name: 'CreateSight',
      component: CreateSight,
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
    }
  ]
})
