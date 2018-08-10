import api from './api'

export default {
  fetchMessages () {
    return api.get('messages')
  },
  addNewMessage (params) {
    return api.post('messages', params)
  },
  deleteMessage (id) {
    return api.delete(`messages/${id}`)
  }
}
