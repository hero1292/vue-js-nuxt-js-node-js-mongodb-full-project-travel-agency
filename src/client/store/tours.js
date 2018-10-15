export const state = () => ({
  tours: [],
  tour: {}
})

export const mutations = {
  FETCH_TOURS (state, payload) {
    state.tours = payload
  },
  GET_TOUR (state, payload) {
    state.tour = payload
  }
}

export const actions = {
  async fetchTours ({commit}, payload) {
    let response
    if (payload.params.lang === 'ru' || payload.params.lang === 'en' || payload.params.lang === 'arm') {
      if (!payload.query.type) {
        response = await this.$api.get(`/${payload.params.lang}/${payload.params.tours}`)
      } else {
        response = await this.$api.get(`/${payload.params.lang}/${payload.params.tours}?type=${payload.query.type}`)
      }
    } else {
      this.$router.back()
    }
    try {
      this.commit('shared/CLEAR_SUCCESS')
      this.commit('shared/CLEAR_ERROR')
      commit('FETCH_TOURS', response.data)
    } catch (err) {
      this.commit('shared/SET_ERROR', this.$t('forms.error'))
      throw err
    }
  },
  async getTour ({commit}, payload) {
    let response
    if (payload.lang === 'ru' || payload.lang === 'en' || payload.lang === 'arm') {
      response = await this.$api.get(`/${payload.lang}/${payload.tours}/${payload.id}`)
    } else {
      this.$router.back()
    }
    try {
      this.commit('shared/CLEAR_SUCCESS')
      this.commit('shared/CLEAR_ERROR')
      commit('GET_TOUR', response.data)
    } catch (err) {
      this.commit('shared/SET_ERROR', this.$t('forms.error'))
      throw err
    }
  }
}

export const getters = {
  tours (state) {
    return state.tours
  },
  tour (state) {
    return state.tour
  }
}
