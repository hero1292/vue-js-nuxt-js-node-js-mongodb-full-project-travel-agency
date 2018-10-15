import api from './api'

export default {
  fetchTours (params) {
    return api.get(`/${params.lang}/${params.tours}`)
  },
  fetchToursByTypes (params) {
    return api.get(`/${params.lang}/${params.tours}?type=${params.query}`)
  },
  addNewTour (params) {
    return api.post(`/${params.tours}`, params.tour)
  },
  getTourForUpdate (params) {
    return api.get(`/update/${params.lang}/${params.tours}/${params.id}`)
  },
  updateTour (params) {
    return api.put(`/${params.tours}/${params.id}`, params.tour)
  },
  deleteTour (params) {
    return api.delete(`/${params.tours}/${params.id}`)
  }
}
