import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import HelloWorld from '../components/HelloWorld.vue'
import Login from '../components/auth/Login.vue'
import Registration from '../components/auth/Registration.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
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
    }
  ]
})
