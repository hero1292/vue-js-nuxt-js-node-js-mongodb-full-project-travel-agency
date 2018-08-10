import api from './api'

export default {
  register (params) {
    return api.post('/api/auth/registration', params)
  },
  login (params) {
    return api.post('/api/auth/login', params)
  },
  logout () {
    return api.post('/api/auth/logout')
  },
  getUser () {
    return api.get('/api/auth/me')
  }
}
