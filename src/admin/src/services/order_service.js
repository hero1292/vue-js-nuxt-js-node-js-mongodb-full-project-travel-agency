import api from './api'

export default {
  fetchOrders () {
    return api.get('orders')
  },
  addNewOrder (params) {
    return api.post('orders', params)
  },
  deleteOrder (id) {
    return api.delete(`orders/${id}`)
  }
}
