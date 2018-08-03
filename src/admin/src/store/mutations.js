export default {
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_LOADING (state, payload) {
    state.loading = payload
  },
  SET_ERROR (state, payload) {
    state.error = payload
  },
  CLEAR_ERROR (state) {
    state.error = null
  },
  SET_SUCCESS (state, payload) {
    state.success = payload
  },
  CLEAR_SUCCESS (state) {
    state.success = null
  }
}
