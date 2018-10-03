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
      daysAndNights: {ru: '', en: '', arm: ''},
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
      pleaseNotes: [],
      images: []
    },
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
    CLEAR_DATA_OF_TOUR (state, payload) {
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
      state.tour.images.splice(payload.index, payload.num)
    }
  },
  actions: {
    async addTour ({commit, state}, tour) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        if (state.tourType === 'in') {
          await toursService.addNewIncomingTour(tour)
        } else if (state.tourType === 'out') {
          await toursService.addNewOutgoingTour(tour)
        } else if (state.tourType === 'daily') {
          await toursService.addNewDailyTour(tour)
        }
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур успешно добавлен!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async fetchIncomingTours ({commit}, payload) {
      let response
      if (payload.lang === 'ru' || payload.lang === 'en' || payload.lang === 'arm') {
        if (!payload.query) {
          response = await toursService.fetchIncomingTours(payload.lang)
        } else {
          response = await toursService.fetchIncomingToursByTypes({lang: payload.lang, query: payload.query})
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
    async fetchOutgoingTours ({commit}, payload) {
      let response
      if (payload === 'ru' || payload === 'en' || payload === 'arm') {
        response = await toursService.fetchOutgoingTours(payload)
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
    async fetchDailyTours ({commit}, payload) {
      let response
      if (payload.lang === 'ru' || payload.lang === 'en' || payload.lang === 'arm') {
        if (!payload.query) {
          response = await toursService.fetchDailyTours(payload.lang)
        } else {
          response = await toursService.fetchDailyToursByTypes({lang: payload.lang, query: payload.query})
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
    async getIncomingTour ({commit}, payload) {
      const response = await toursService.getIncomingTourForUpdate(payload)
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
    async getOutgoingTour ({commit}, payload) {
      const response = await toursService.getOutgoingTourForUpdate(payload)
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
    async getDailyTour ({commit}, payload) {
      const response = await toursService.getDailyTourForUpdate(payload)
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
    editIncomingTour: async function ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await toursService.updateIncomingTour(payload.id, payload.tour)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур успешно изменен!')
        router.back()
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    editOutgoingTour: async function ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await toursService.updateOutgoingTour(payload.id, payload.tour)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур успешно изменен!')
        router.back()
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    editDailyTour: async function ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await toursService.updateDailyTour(payload.id, payload.tour)
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
