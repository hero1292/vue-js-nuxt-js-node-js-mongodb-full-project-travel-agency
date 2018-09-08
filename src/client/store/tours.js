
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
  async fetchTours ({commit}) {
    let response
    const lang = this.$router.history.current.params.lang
    const param = this.$router.history.current.params.tours
    const query = this.$router.history.current.query.type
    if (lang === 'ru' || lang === 'en' || lang === 'arm') {
      if (param === 'incoming_tours') {
        if (!query) {
          response = await this.$api.get(`/${lang}/incoming_tours`)
        } else {
          response = await this.$api.get(`/${lang}/incoming_tours?type=${query}`)
        }
      } else if (param === 'outgoing_tours') {
        response = await this.$api.get(`/${lang}/outgoing_tours`)
      } else if (param === 'daily_tours') {
        if (!query) {
          response = await this.$api.get(`/${lang}/daily_tours`)
        } else {
          response = await this.$api.get(`/${lang}/daily_tours?type=${query}`)
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
      this.commit('shared/SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
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
      this.commit('shared/SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
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
