export default {
  state: {
    loading: false,
    error: null,
    success: null
  },
  mutations: {
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
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('SET_LOADING', payload)
    },

    setError ({commit}, payload) {
      commit('SET_ERROR', payload)
    },

    clearError ({commit}) {
      commit('CLEAR_ERROR')
    },

    setSuccess ({commit}, payload) {
      commit('SET_SUCCESS', payload)
    },

    clearSuccess ({commit}) {
      commit('CLEAR_SUCCESS')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    success (state) {
      return state.success
    }
  }
}
