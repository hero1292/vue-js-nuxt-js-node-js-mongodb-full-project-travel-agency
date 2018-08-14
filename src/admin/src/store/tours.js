import toursService from '../services/tours_service'
import { createHelpers } from 'vuex-map-fields'
import router from '@/router'

const { getToursField, updateToursField } = createHelpers({
  getterType: 'getToursField',
  mutationType: 'updateToursField'
})

export default {
  state: {
    search: '',
    searchDay: '',
    incomingTours: [],
    outgoingTours: [],
    dailyTours: [],
    valid: false,
    dateModal: false,
    startModal: false,
    endModal: false,
    tourType: 'in',
    toursItem: [
      {name: 'Classic'},
      {name: 'Adventure'},
      {name: 'Regional'},
      {name: 'Special'},
      {name: 'Winter'},
      {name: 'Budget'}
    ],
    tour: {
      date: '',
      repeat: { ru: '', en: '', arm: '' },
      start: null,
      end: null,
      typesOfDailyTour: { ru: '', en: '', arm: '' },
      typesOfTour: [],
      title: {ru: '', en: '', arm: ''},
      country: {ru: '', en: '', arm: ''},
      days: '',
      nights: '',
      prices: {amd: '', rur: '', usd: '', eur: ''},
      description: {ru: '', en: '', arm: ''},
      groupSize: '',
      accommodation: {ru: '', en: '', arm: ''},
      bestPeriod: {ru: '', en: '', arm: ''},
      startEndPoint: {ru: '', en: '', arm: ''},
      arrayOfDays: [{
        way: {ru: '', en: '', arm: ''},
        text: {ru: '', en: '', arm: ''},
        overnight: {ru: '', en: '', arm: ''}
      }],
      priceIncludes: [],
      priceExcludes: [],
      pleaseNotes: []
    },
    files: [],
    titleRules: [
      v => !!v || 'Заполните поле',
      v => v.length > 5 || 'Заголовок должен быть больше 5-и символов'
    ],
    descriptionRules: [
      v => !!v || 'Заполните поле',
      v => v.length > 10 || 'Краткое описание должно быть больше 10-и символов'
    ],
    rules: [
      v => !!v || 'Заполните поле'
    ]
  },
  mutations: {
    updateToursField,
    FETCH_INCOMING_TOURS (state, payload) {
      state.incomingTours = payload
    },
    FETCH_OUTGOING_TOURS (state, payload) {
      state.outgoingTours = payload
    },
    FETCH_DAILY_TOURS (state, payload) {
      state.dailyTours = payload
    },
    GET_INCOMING_TOUR (state, payload) {
      state.tour = payload
    },
    GET_OUTGOING_TOUR (state, payload) {
      state.tour = payload
    },
    GET_DAILY_TOUR (state, payload) {
      state.tour = payload
    },
    ADD_DAY (state) {
      state.tour.arrayOfDays.push({
        way: {ru: '', en: '', arm: ''},
        text: {ru: '', en: '', arm: ''},
        overnight: {ru: '', en: '', arm: ''}
      })
    },
    ADD_PRICE_INCLUDES (state) {
      state.tour.priceIncludes.push({valueOfInc: {ru: '', en: '', arm: ''}})
    },
    ADD_PRICE_EXCLUDES (state) {
      state.tour.priceExcludes.push({valueOfExc: {ru: '', en: '', arm: ''}})
    },
    ADD_PLEASE_NOTES (state) {
      state.tour.pleaseNotes.push({valueOfNote: {ru: '', en: '', arm: ''}})
    },
    REMOVE_DAY (state, payload) {
      state.tour.arrayOfDays.splice(payload.index, payload.num)
    },
    REMOVE_PRICE_INCLUDES (state, payload) {
      state.tour.priceIncludes.splice(payload.index, payload.num)
    },
    REMOVE_PRICE_EXCLUDES (state, payload) {
      state.tour.priceExcludes.splice(payload.index, payload.num)
    },
    REMOVE_PLEASE_NOTES (state, payload) {
      state.tour.pleaseNotes.splice(payload.index, payload.num)
    },
    REMOVE_FILE (state, payload) {
      state.files.splice(payload.index, payload.num)
    }
  },
  actions: {
    async addTour ({commit, state}) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        if (state.tourType === 'in') {
          await toursService.addNewIncomingTour(state.tour)
        } else if (state.tourType === 'out') {
          await toursService.addNewOutgoingTour(state.tour)
        } else if (state.tourType === 'daily') {
          await toursService.addNewDailyTour(state.tour)
        }
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур успешно добавлен!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async fetchIncomingTours ({commit}) {
      let response
      const lang = router.currentRoute.params.lang
      const query = router.currentRoute.query.type
      if (lang === 'ru' || lang === 'en' || lang === 'arm') {
        if (!query) {
          response = await toursService.fetchIncomingTours({lang})
        } else {
          response = await toursService.fetchIncomingToursByTypes({lang, query})
        }
      } else {
        router.back()
      }
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('FETCH_INCOMING_TOURS', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async fetchOutgoingTours ({commit}) {
      let response
      const lang = router.currentRoute.params.lang
      if (lang === 'ru' || lang === 'en' || lang === 'arm') {
        response = await toursService.fetchOutgoingTours({lang})
      } else {
        router.back()
      }
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('FETCH_OUTGOING_TOURS', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async fetchDailyTours ({commit}) {
      let response
      const lang = router.currentRoute.params.lang
      const query = router.currentRoute.query.type
      if (lang === 'ru' || lang === 'en' || lang === 'arm') {
        if (!query) {
          response = await toursService.fetchDailyTours({lang})
        } else {
          response = await toursService.fetchDailyToursByTypes({lang, query})
        }
      } else {
        router.back()
      }
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('FETCH_DAILY_TOURS', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async removeIncomingTour ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await toursService.deleteIncomingTour(payload)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур удален успешно!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async removeOutgoingTour ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await toursService.deleteOutgoingTour(payload)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур удален успешно!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async removeDailyTour ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await toursService.deleteDailyTour(payload)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур удален успешно!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async getIncomingTour ({commit}) {
      const response = await toursService.getIncomingTourForUpdate(router.currentRoute.params.id)
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('GET_INCOMING_TOUR', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async getOutgoingTour ({commit}) {
      const response = await toursService.getOutgoingTourForUpdate(router.currentRoute.params.id)
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('GET_OUTGOING_TOUR', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async getDailyTour ({commit}) {
      const response = await toursService.getDailyTourForUpdate(router.currentRoute.params.id)
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('GET_DAILY_TOUR', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    editIncomingTour: async function ({commit, state}) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await toursService.updateIncomingTour(router.currentRoute.params.id, state.tour)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур успешно изменен!')
        router.back()
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    editOutgoingTour: async function ({commit, state}) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await toursService.updateOutgoingTour(router.currentRoute.params.id, state.tour)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур успешно изменен!')
        router.back()
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    editDailyTour: async function ({commit, state}) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await toursService.updateDailyTour(router.currentRoute.params.id, state.tour)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур успешно изменен!')
        router.back()
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    }
  },
  getters: {
    getToursField
  }
}
