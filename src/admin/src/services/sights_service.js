import api from './api'

export default {
  fetchSights (params) {
    return api.get(`${params.lang}/sights`)
  },
  addNewSight (params) {
    return api.post('sights', params)
  },
  getSight (params) {
    return api.get(`${params.lang}/sights/${params.id}`)
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
