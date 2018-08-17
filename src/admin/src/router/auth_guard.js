import api from '../services/api'
import auth from '../services/auth_service'
import cookie from 'vue-cookie'
import store from '../store'

export default function (to, from, next) {
  api.defaults.headers.common['x-access-token'] = null
  const token = cookie.get('token')
  if (token) {
    api.defaults.headers.common['x-access-token'] = token

    auth.getUser()
      .then(user => {
        store.commit('SET_TOKEN', {
          auth: true,
          token: token
        })
        store.commit('SET_USER', user.data)
        next()
      })
      .catch(e => {
        cookie.delete('token')
        next('/login?loginError=true')
      })
  } else {
    next('/login?loginError=true')
    store.dispatch('setError', 'Войдите в админ панель!')
  }
}
