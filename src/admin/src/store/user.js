import auth from '../services/auth_service'
import cookie from 'vue-cookie'
import { createHelpers } from 'vuex-map-fields'
import router from '@/router'

const { getWorkersField, updateWorkersField } = createHelpers({
  getterType: 'getWorkersField',
  mutationType: 'updateWorkersField'
})

export default {
  state: {
    token: null,
    user: null,
    valid: false,
    search: '',
    headers: [
      {text: 'Имя', value: 'firstName'},
      {text: 'Фамилия', value: 'lastName'},
      {text: 'Должность', value: 'position'},
      {text: 'Email', value: 'email'},
      {text: 'Роль', value: 'roles'}
    ],
    workers: [],
    worker: {
      firstName: '',
      lastName: '',
      position: '',
      email: '',
      password: '',
      roles: ''
    },
    confirmPassword: '',
    avatar: null,
    imageSrc: '',
    superAdminRolesItems: ['Admin', 'Moderator'],
    adminRolesItems: ['Moderator'],
    emailRules: [
      v => !!v || 'Заполните поле E-mail',
      v => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/.test(v) || 'Заполните поле E-mail правильно'
    ],
    passwordRules: [
      v => !!v || 'Заполните поле пароль',
      v => (v && v.length >= 6) || 'Пароль должен состоять минимум из 6 символов'
    ],
    confirmPasswordRules: [
      v => !!v || 'Повторите пароль',
      v => v === this.password || 'Пароль не совпадает'
    ],
    rules: [
      v => !!v || 'Заполните поле имя'
    ]
  },
  mutations: {
    updateWorkersField,
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER (state, user) {
      state.user = user
    },
    FETCH_WORKERS (state, payload) {
      state.workers = payload
    },
    GET_WORKER (state, payload) {
      state.worker = payload
    },
    CLEAR_DATA_OF_WORKER (state, payload) {
      state.worker = payload
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
        commit('SET_SUCCESS', 'Работник успешно зарегистрирован!')
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
    async logout ({commit, getters, state}) {
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
    },
    async fetchWorkers ({commit}) {
      const response = await auth.fetchWorkers()
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('FETCH_WORKERS', response.data.workers)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async removeWorker ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await auth.deleteWorker(payload)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Работник удален успешно!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async getWorker ({commit}) {
      const response = await auth.getWorkerForUpdate(router.currentRoute.params.id)
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('GET_WORKER', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async editWorker ({commit, state}) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await auth.updateWorker(router.currentRoute.params.id, state.worker)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Работник успешно изменен!')
        router.back()
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', err.response.data)
        throw err
      }
    },
    async editPassword ({commit, state}) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await auth.updatePassword(router.currentRoute.params.id, state.worker)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Пароль успешно изменен!')
        router.back()
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', err.response.data)
        throw err
      }
    }
  },
  getters: {
    getWorkersField,
    user (state) {
      return state.user
    }
  }
}
