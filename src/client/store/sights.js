
export const state = () => ({
  sights: [],
  sight: {}
})

export const mutations = {
  FETCH_SIGHTS (state, payload) {
    state.sights = payload
  },
  GET_SIGHT (state, payload) {
    state.sight = payload
  }
}

export const actions = {
  async fetchSights ({commit}, payload) {
    let response
    if (payload.lang === 'ru' || payload.lang === 'en' || payload.lang === 'arm') {
      response = await this.$api.get(`/${payload.lang}/sights`)
    } else {
      this.$router.back()
    }
    try {
      this.commit('shared/CLEAR_SUCCESS')
      this.commit('shared/CLEAR_ERROR')
      commit('FETCH_SIGHTS', response.data)
    } catch (err) {
      this.commit('shared/SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
      throw err
    }
  },
  async getSight ({commit}, payload) {
    let response
    if (payload.lang === 'ru' || payload.lang === 'en' || payload.lang === 'arm') {
      response = await this.$api.get(`/${payload.lang}/sights/${payload.id}`)
    } else {
      this.$router.back()
    }
    try {
      this.commit('shared/CLEAR_SUCCESS')
      this.commit('shared/CLEAR_ERROR')
      commit('GET_SIGHT', response.data)
    } catch (err) {
      this.commit('shared/SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
      throw err
    }
  }
}

export const getters = {
  sights (state) {
    return state.sights
  },
  sight (state) {
    return state.sight
  }
}
