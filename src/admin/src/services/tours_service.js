import api from './api'

export default {
  // Incoming tours
  fetchIncomingTours (params) {
    return api.get(`${params.lang}/incoming-tours`)
  },
  fetchIncomingToursByTypes (params) {
    return api.get(`${params.lang}/incoming-tours?type=${params.id}`)
  },
  addNewIncomingTour (params) {
    return api.post('incoming-tours', params)
  },
  getIncomingTour (params) {
    return api.get(`${params.lang}/incoming-tours/${params.id}`)
  },
  getIncomingTourForUpdate (id) {
    return api.get(`incoming-tours/${id}`)
  },
  updateIncomingTour (id, params) {
    return api.put(`incoming-tours/${id}`, params)
  },
  deleteIncomingTour (params) {
    return api.delete(`${params.lang}/incoming-tours/${params.id}`)
  },
  // Outgoing tours
  fetchOutgoingTours (params) {
    return api.get(`${params.lang}/outgoing-tours`)
  },
  addNewOutgoingTour (params) {
    return api.post('outgoing-tours', params)
  },
  getOutgoingTour (params) {
    return api.get(`${params.lang}/outgoing-tours/${params.id}`)
  },
  getOutgoingTourForUpdate (id) {
    return api.get(`outgoing-tours/${id}`)
  },
  updateOutgoingTour (id, params) {
    return api.put(`outgoing-tours/${id}`, params)
  },
  deleteOutgoingTour (params) {
    return api.delete(`${params.lang}/outgoing-tours/${params.id}`)
  }
}
