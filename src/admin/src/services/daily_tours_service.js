import api from './api'

export default {
  fetchTours () {
    return api.get('daily_tours')
  },
  fetchToursByTypes (params) {
    return api.get(`daily_tours?type=${params.id}`)
  },
  addNewTour (params) {
    return api.post('daily_tours', params)
  },
  getTour (params) {
    return api.get(`daily_tours/${params.id}`)
  },
  updateTour (params) {
    return api.put(`daily_tours/${params.id}`, params)
  },
  deleteTour (id) {
    return api.delete(`daily_tours/${id}`)
  }
}
