import api from './api'

export default {
  // INCOMING TOURS
  fetchIncomingTours (params) {
    return api.get(`${params.lang}/incoming_tours`)
  },
  fetchIncomingToursByTypes (params) {
    return api.get(`${params.lang}/incoming_tours?type=${params.query}`)
  },
  addNewIncomingTour (params) {
    return api.post('incoming_tours', params)
  },
  getIncomingTourForUpdate (id) {
    return api.get(`incoming_tours/${id}`)
  },
  updateIncomingTour (id, params) {
    return api.put(`incoming_tours/${id}`, params)
  },
  deleteIncomingTour (params) {
    return api.delete(`${params.lang}/incoming_tours/${params.id}`)
  },
  // OUTGOING TOURS
  fetchOutgoingTours (params) {
    return api.get(`${params.lang}/outgoing_tours`)
  },
  addNewOutgoingTour (params) {
    return api.post('outgoing_tours', params)
  },
  getOutgoingTourForUpdate (id) {
    return api.get(`outgoing_tours/${id}`)
  },
  updateOutgoingTour (id, params) {
    return api.put(`outgoing_tours/${id}`, params)
  },
  deleteOutgoingTour (params) {
    return api.delete(`${params.lang}/outgoing_tours/${params.id}`)
  },

  // DAILY TOURS
  fetchDailyTours (params) {
    return api.get(`${params.lang}/daily_tours`)
  },
  fetchDailyToursByTypes (params) {
    return api.get(`${params.lang}/daily_tours?type=${params.query}`)
  },
  addNewDailyTour (params) {
    return api.post('daily_tours', params)
  },
  getDailyTourForUpdate (id) {
    return api.get(`daily_tours/${id}`)
  },
  updateDailyTour (id, params) {
    return api.put(`daily_tours/${id}`, params)
  },
  deleteDailyTour (params) {
    return api.delete(`${params.lang}/daily_tours/${params.id}`)
  }
}
