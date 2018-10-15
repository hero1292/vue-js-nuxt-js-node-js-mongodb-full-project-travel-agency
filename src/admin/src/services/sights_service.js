import api from './api'

export default {
  fetchSights (params) {
    return api.get(`/${params}/sights`)
  },
  addNewSight (params) {
    return api.post('/sights', params)
  },
  getSightForUpdate (params) {
    return api.get(`/update/${params.lang}/sights/${params.id}`)
  },
  updateSight (id, params) {
    return api.put(`/sights/${id}`, params)
  },
  deleteSight (params) {
    return api.delete(`/sights/${params.id}`)
  }
}
