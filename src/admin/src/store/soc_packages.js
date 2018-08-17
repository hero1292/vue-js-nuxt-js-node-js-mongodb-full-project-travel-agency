import socService from '../services/soc_package_service'
import {createHelpers} from 'vuex-map-fields'
import router from '@/router'

const {getSocField, updateSocField} = createHelpers({
  getterType: 'getSocField',
  mutationType: 'updateSocField'
})

export default {
  state: {
    valid: false,
    hotels: [],
    arrivalModal: false,
    departureModal: false,
    resorts: [
      {name: 'Tsaghkadzor'},
      {name: 'Aghveran'},
      {name: 'Hankavan'},
      {name: 'Ahavnadzor'},
      {name: 'Dilijan'},
      {name: 'Sevan'},
      {name: 'Stepanavan'},
      {name: 'Vanadzor'},
      {name: 'Djermuk'},
      {name: 'Byurakan'},
      {name: 'Idjevan'},
      {name: 'Yeghegnadzor_Vayk'},
      {name: 'Artsakh'},
      {name: 'Haghpat'},
      {name: 'Syunik'},
      {name: 'Gyumri'}
    ],
    values: [
      {name: 'room'},
      {name: 'price1'},
      {name: 'price2'},
      {name: 'price3'},
      {name: 'price4'},
      {name: 'price5'},
      {name: 'price6'},
      {name: 'price7'},
      {name: 'price8'},
      {name: 'price9'},
      {name: 'price10'}
    ],
    hotel: {
      resort: '',
      title: '',
      tables: [{
        headers: [{}],
        prices: [{}]
      }],
      description: '',
      arrival: null,
      departure: null,
      socPackages: [{}]
    },
    images: [],
    titleRules: [
      v => v.length > 5 || 'Заголовок должен быть больше 5-и символов'
    ],
    descriptionRules: [
      v => v.length > 10 || 'Описание должно быть больше 10-и символов'
    ],
    socPackagesRules: [
      v => !!v || 'Заполните поле'
    ]
  },
  mutations: {
    updateSocField,
    FETCH_HOTELS (state, payload) {
      state.hotels = payload
    },
    GET_HOTEL (state, payload) {
      state.hotel = payload
    },
    CLEAR_DATA_OF_HOTEL (state, payload) {
      state.hotel = payload
    },
    ADD_TABLE (state) {
      state.hotel.tables.push({
        headers: [{}],
        prices: [{}]
      })
    },
    ADD_HEADER (state) {
      state.hotel.tables.forEach(table => {
        table.headers.push({
          title: '',
          value: ''
        })
      })
    },
    ADD_PRICE (state) {
      state.hotel.tables.forEach(table => {
        table.prices.push({
          room: '',
          price1: '',
          price2: '',
          price3: '',
          price4: '',
          price5: '',
          price6: '',
          price7: '',
          price8: '',
          price9: '',
          price10: ''
        })
      })
    },
    ADD_SOC_PACKAGE (state) {
      state.hotel.socPackages.push({package: ''})
    },
    REMOVE_TABLE (state, payload) {
      state.hotel.tables.splice(payload.index, payload.num)
    },
    REMOVE_HEADER (state, payload) {
      state.hotel.tables.forEach(table => {
        table.headers.splice(payload.index, payload.num)
      })
    },
    REMOVE_PRICE (state, payload) {
      state.hotel.tables.forEach(table => {
        table.prices.splice(payload.index, payload.num)
      })
    },
    REMOVE_SOC_PACKAGE (state, payload) {
      state.hotel.socPackages.splice(payload.index, payload.num)
    },
    REMOVE_FILE (state, payload) {
      state.images.splice(payload.index, payload.num)
    }
  },
  actions: {
    async addHotel ({commit, state}) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await socService.addNewPackage(state.hotel)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Отель успешно добавлен!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async fetchHotels ({commit}) {
      const query = router.currentRoute.query.type
      const response = await socService.fetchPackagesByTypes({query})
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('FETCH_HOTELS', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async removeHotel ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await socService.deletePackage(payload)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Достопримечательность удалена успешно!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async getHotel ({commit}) {
      const response = await socService.getPackage(router.currentRoute.params.id)
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('GET_HOTEL', response.data)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async editHotel ({commit, state}) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await socService.updatePackage(router.currentRoute.params.id, state.hotel)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Отель успешно изменен!')
        router.back()
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    }
  },
  getters: {
    getSocField
  }
}
