
export const state = () => ({
  tours: [],
  tour: []
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
    const lang = this.app.router.history.current.params.lang
    const param = this.app.router.history.current.params.tours
    const query = this.app.router.history.current.query.type
    if (lang === 'ru' || lang === 'en' || lang === 'arm') {
      if (param === 'incoming_tours') {
        if (!query) {
          response = await this.app.$axios.$get(`http://localhost:8080/${lang}/incoming_tours`)
        } else {
          response = await this.app.$axios.$get(`http://localhost:8080/${lang}/incoming_tours?type=${query}`)
        }
      } else if (param === 'outgoing_tours') {
        response = await this.app.$axios.$get(`http://localhost:8080/${lang}/outgoing_tours`)
      } else if (param === 'daily_tours') {
        if (!query) {
          response = await this.app.$axios.$get(`http://localhost:8080/${lang}/daily_tours`)
        } else {
          response = await this.app.$axios.$get(`http://localhost:8080/${lang}/daily_tours?type=${query}`)
        }
      } else {
        this.app.router.back()
      }
    } else {
      this.app.router.back()
    }
    try {
      this.commit('shared/CLEAR_SUCCESS')
      this.commit('shared/CLEAR_ERROR')
      this.commit('shared/SET_LOADING', true)
      commit('FETCH_TOURS', response)
      this.commit('shared/SET_LOADING', false)
    } catch (err) {
      this.commit('shared/SET_LOADING', false)
      this.commit('shared/SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
      throw err
    }
  }
}

export const getters = {
  tours (state) {
    return state.tours
  }
}
