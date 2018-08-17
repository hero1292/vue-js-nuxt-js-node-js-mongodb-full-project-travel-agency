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
  },
  fetchWorkers () {
    return api.get('/api/auth/workers')
  },
  getWorkerForUpdate (id) {
    return api.get(`/api/auth/workers/${id}`)
  },
  updateWorker (id, params) {
    return api.put(`/api/auth/workers/${id}`, params)
  },
  updatePassword (id, params) {
    return api.put(`/api/auth//workers/change_password/${id}`, params)
  },
  deleteWorker (id) {
    return api.delete(`/api/auth/workers/${id}`)
  }
}
