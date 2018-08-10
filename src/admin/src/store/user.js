import auth from '../services/auth_service'
import cookie from 'vue-cookie'

export default {
  state: {
    token: null,
    user: null
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    async registration ({commit}, user) {
      commit('CLEAR_SUCCESS')
      commit('CLEAR_ERROR')
      commit('SET_LOADING', true)
      try {
        await auth.register(user)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Пользователь успешно зарегистрирован!')
      } catch (error) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', error.response.data)
        throw error
      }
    },
    async login ({commit}, user) {
      commit('CLEAR_SUCCESS')
      commit('CLEAR_ERROR')
      commit('SET_LOADING', true)
      try {
        const {data} = await auth.login(user)
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
        const {data} = await auth.logout()
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
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
