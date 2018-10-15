import api from './api'

export default {
  fetchOrders () {
    return api.get('/orders')
  },
  deleteOrder (id) {
    return api.delete(`/orders/${id}`)
  }
}
