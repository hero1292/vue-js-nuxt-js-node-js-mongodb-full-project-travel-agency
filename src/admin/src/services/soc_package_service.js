import api from './api'

export default {
  fetchPackages () {
    return api.get('soc_packages')
  },
  fetchPackagesByTypes (params) {
    return api.get(`soc_packages?type=${params.id}`)
  },
  addNewPackage (params) {
    return api.post('soc_packages', params)
  },
  getPackage (params) {
    return api.get(`soc_packages/${params.id}`)
  },
  updatePackage (params) {
    return api.put(`soc_packages/${params.id}`, params)
  },
  deletePackage (id) {
    return api.delete(`soc_packages/${id}`)
  }
}
