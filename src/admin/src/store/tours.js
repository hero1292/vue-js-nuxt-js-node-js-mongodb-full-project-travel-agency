import toursService from '../services/tours_service'
import {getField, updateField} from 'vuex-map-fields'
import router from '@/router'

export default {
  state: {
    tours: [],
    valid: false,
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
    updateField,
    ADD_TOUR (state) {
      if (state.tourType === 'in') {
        toursService.addNewIncomingTour(state.tour)
      } else if (state.tourType === 'out') {
        toursService.addNewOutgoingTour(state.tour)
      }
    },
    GET_TOURS (state, payload) {
      state.tours = payload
    },
    GET_TOUR (state, payload) {
      state.tour = payload
    },
    EDIT_TOUR (state, payload) {
      toursService.updateIncomingTour(payload, state.tour)
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
    async addTour ({commit}) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await commit('ADD_TOUR')
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур успешно добавлен!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async getTours ({commit}) {
      let response
      const lang = router.currentRoute.params.lang
      const query = router.currentRoute.query.type
      if (lang === 'ru' || lang === 'en' || lang === 'arm') {
        if (!query) {
          response = await toursService.fetchIncomingTours({lang})
        } else {
          response = await toursService.fetchIncomingToursByTypes({lang, id: query})
        }
      } else {
        router.back()
      }
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('GET_TOURS', response.data)
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
        await toursService.deleteIncomingTour(payload)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Тур удален успешно!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async getTour ({commit}) {
      const response = await toursService.getIncomingTourForUpdate(router.currentRoute.params.id)
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('GET_TOUR', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    editTour: async function ({commit}) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await commit('EDIT_TOUR', router.currentRoute.params.id)
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
    getField
  }
}
