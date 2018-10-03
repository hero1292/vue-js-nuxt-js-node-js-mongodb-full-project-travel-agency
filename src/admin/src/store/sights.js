import sightsService from '../services/sights_service'
import {createHelpers} from 'vuex-map-fields'
import router from '@/router'

const {getSightsField, updateSightsField} = createHelpers({
  getterType: 'getSightsField',
  mutationType: 'updateSightsField'
})

export default {
  state: {
    valid: false,
    search: '',
    sights: [],
    sight: {
      title: {ru: '', en: '', arm: ''},
      region: {ru: '', en: '', arm: ''},
      distance: '',
      typeOfSight: {ru: '', en: '', arm: ''},
      description: {ru: '', en: '', arm: ''},
      wayFromYerevan: {ru: '', en: '', arm: ''},
      weather: {ru: '', en: '', arm: ''},
      facts: [{text: {ru: '', en: '', arm: ''}}],
      images: []
    },
    titleRules: [
      v => v.length > 5 || 'Заголовок должен быть больше 5-и символов'
    ],
    descriptionRules: [
      v => v.length > 10 || 'Краткое описание должно быть больше 10-и символов'
    ],
    firstRules: [
      v => !!v || 'Заполните поле'
    ],
    secondRules: [
      v => v.length > 5 || 'Поле должно быть больше 5-и символов'
    ]
  },
  mutations: {
    updateSightsField,
    FETCH_SIGHTS (state, payload) {
      state.sights = payload
    },
    GET_SIGHT (state, payload) {
      state.sight = payload
    },
    CLEAR_DATA_OF_SIGHT (state, payload) {
      state.sight = payload
    },
    ADD_FACTS (state) {
      state.sight.facts.push({text: {ru: '', en: '', arm: ''}})
    },
    REMOVE_FACTS (state, payload) {
      state.sight.facts.splice(payload.index, payload.num)
    },
    REMOVE_FILE (state, payload) {
      state.images.splice(payload.index, payload.num)
    }
  },
  actions: {
    async addSight ({commit}, sight) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await sightsService.addNewSight(sight)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Достопримечательность успешно добавлена!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async fetchSights ({commit}, payload) {
      let response
      if (payload === 'ru' || payload === 'en' || payload === 'arm') {
        response = await sightsService.fetchSights(payload)
      } else {
        router.back()
      }
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('FETCH_SIGHTS', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async removeSight ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await sightsService.deleteSight(payload)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Достопримечательность удалена успешно!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async getSight ({commit}, payload) {
      const response = await sightsService.getSightForUpdate(payload)
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('GET_SIGHT', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async editSight ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await sightsService.updateSight(payload.id, payload.sight)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Достопримечательность успешно изменена!')
        router.back()
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    }
  },
  getters: {
    getSightsField
  }
}
