import api from './api'

export default {
  fetchMessages () {
    return api.get('messages')
  },
  deleteMessage (id) {
    return api.delete(`messages/${id}`)
  }
}
