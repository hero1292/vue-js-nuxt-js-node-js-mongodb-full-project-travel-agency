import api from './api'

export default {
  fetchSights (params) {
    return api.get(`${params}/sights`)
  },
  addNewSight (params) {
    return api.post('sights', params)
  },
  getSightForUpdate (id) {
    return api.get(`sights/${id}`)
  },
  updateSight (id, params) {
    return api.put(`sights/${id}`, params)
  },
  deleteSight (params) {
    return api.delete(`${params.lang}/sights/${params.id}`)
  }
}
