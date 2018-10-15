import toursService from '../services/tours_service'
import {createHelpers} from 'vuex-map-fields'
import router from '@/router'

const {getToursField, updateToursField} = createHelpers({
  getterType: 'getToursField',
  mutationType: 'updateToursField'
})

export default {
  state: {
    search: '',
    searchDay: '',
    tours: [],
    valid: false,
    dateModal: false,
    startModal: false,
    endModal: false,
    tourType: 'incoming_tours',
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
      repeat: {ru: '', en: '', arm: ''},
      start: null,
      end: null,
      typesOfDailyTour: {ru: '', en: '', arm: ''},
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
    FETCH_TOURS (state, payload) {
      state.tours = payload
    },
    GET_TOUR (state, payload) {
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
    async addTour ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        const {data} = await toursService.addNewTour({tours: payload.type, tour: payload.tour})
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', data.message)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', err.response.data.message)
        throw err
      }
    },
    async fetchTours ({commit}, payload) {
      let response
      if (payload.lang === 'ru' || payload.lang === 'en' || payload.lang === 'arm') {
        if (!payload.query) {
          response = await toursService.fetchTours({lang: payload.lang, tours: payload.tours})
        } else {
          response = await toursService.fetchToursByTypes({
            lang: payload.lang,
            tours: payload.tours,
            query: payload.query
          })
        }
      } else {
        router.back()
      }
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('FETCH_TOURS', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async removeTour ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        const {data} = await toursService.deleteTour({tours: payload.tours, id: payload.id})
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', data.message)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', err.response.data.message)
        throw err
      }
    },
    async getTour ({commit}, payload) {
      const response = await toursService.getTourForUpdate({lang: payload.lang, tours: payload.tours, id: payload.id})
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('GET_TOUR', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', err.response.data.message)
        throw err
      }
    },
    async editTour ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        const {data} = await toursService.updateTour({tours: payload.tours, id: payload.id, tour: payload.tour})
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', data.message)
        router.back()
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', err.response.data.message)
        throw err
      }
    }
  },
  getters: {
    getToursField
  }
}
