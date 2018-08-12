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
  fetchOutgoingTours () {
    return api.get('outgoing-tours')
  },
  fetchOutgoingToursByTypes (params) {
    return api.get(`outgoing-tours?type=${params.id}`)
  },
  addNewOutgoingTour (params) {
    return api.post('outgoing-tours', params)
  },
  getOutgoingTour (params) {
    return api.get(`outgoing-tours/${params.id}`)
  },
  updateOutgoingTour (params) {
    return api.put(`outgoing-tours/${params.id}`, params)
  },
  deleteOutgoingTour (id) {
    return api.delete(`outgoing-tours/${id}`)
  }
}
