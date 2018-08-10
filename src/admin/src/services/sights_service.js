import api from './api'

export default {
  fetchSights () {
    return api.get('sights')
  },
  addNewSight (params) {
    return api.post('sights', params)
  },
  getSight (params) {
    return api.get(`sights/${params.id}`)
  },
  updateSight (params) {
    return api.put(`sights/${params.id}`, params)
  },
  deleteSight (id) {
    return api.delete(`sights/${id}`)
  }
}
