
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
      if (payload.params.tours === 'incoming_tours') {
        if (!payload.query.type) {
          response = await this.$api.get(`/${payload.params.lang}/incoming_tours`)
        } else {
          response = await this.$api.get(`/${payload.params.lang}/incoming_tours?type=${payload.query.type}`)
        }
      } else if (payload.params.tours === 'outgoing_tours') {
        response = await this.$api.get(`/${payload.params.lang}/outgoing_tours`)
      } else if (payload.params.tours === 'daily_tours') {
        if (!payload.query.type) {
          response = await this.$api.get(`/${payload.params.lang}/daily_tours`)
        } else {
          response = await this.$api.get(`/${payload.params.lang}/daily_tours?type=${payload.query.type}`)
        }
      } else {
        this.$router.back()
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
      if (payload.tours === 'incoming_tours') {
        response = await this.$api.get(`/${payload.lang}/incoming_tours/${payload.id}`)
      } else if (payload.tours === 'outgoing_tours') {
        response = await this.$api.get(`/${payload.lang}/outgoing_tours/${payload.id}`)
      } else if (payload.tours === 'daily_tours') {
        response = await this.$api.get(`/${payload.lang}/daily_tours/${payload.id}`)
      } else {
        this.$router.back()
      }
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
