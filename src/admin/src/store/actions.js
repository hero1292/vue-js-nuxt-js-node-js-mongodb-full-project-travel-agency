import api from '../plugins/api'
import cookie from 'vue-cookie'

export default {
  async login ({commit}, user) {
    commit('CLEAR_SUCCESS')
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    try {
      const {data} = await api.post('/api/auth/login', user)
      commit('SET_TOKEN', data)
      commit('SET_LOADING', false)
      commit('SET_SUCCESS', data.message)
      cookie.set('token', data.token)
      return data
    } catch (error) {
      commit('SET_LOADING', false)
      commit('SET_ERROR', 'Неверный логин или пароль')
      throw error
    }
  },

  async logout ({commit, getters}) {
    commit('CLEAR_SUCCESS')
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    try {
      const {data} = await api.post('/api/auth/logout')
      commit('SET_TOKEN', data)
      commit('SET_LOADING', false)
      commit('SET_SUCCESS', 'До свидания, ' + getters.user.firstName + ' ' + getters.user.lastName + '!')
      cookie.delete('token')
      return data
    } catch (error) {
      commit('SET_LOADING', false)
      commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
      throw error
    }
  },

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
}
