import api from './api'

export default {
  fetchPackagesByTypes (params) {
    return api.get(`soc_packages?type=${params.query}`)
  },
  addNewPackage (params) {
    return api.post('soc_packages', params)
  },
  getPackage (id) {
    return api.get(`soc_packages/${id}`)
  },
  updatePackage (id, params) {
    return api.put(`soc_packages/${id}`, params)
  },
  deletePackage (id) {
    return api.delete(`soc_packages/${id}`)
  }
}
