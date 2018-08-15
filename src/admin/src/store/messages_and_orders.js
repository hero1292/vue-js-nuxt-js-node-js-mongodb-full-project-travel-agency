import messageService from '../services/message_service'
import orderService from '../services/order_service'
import {createHelpers} from 'vuex-map-fields'

const {getMessagesAndOrdersField, updateMessagesAndOrdersField} = createHelpers({
  getterType: 'getMessagesAndOrdersField',
  mutationType: 'updateMessagesAndOrdersField'
})

export default {
  state: {
    search: '',
    messagesHeaders: [
      {text: 'Дата', value: 'date'},
      {text: 'Имя', value: 'firstName'},
      {text: 'Фамилия', value: 'lastName'},
      {text: 'Телефон', value: 'phone'},
      {text: 'Email', value: 'email'},
      {text: 'Сообщение', value: 'description'}
    ],
    messages: [],
    OrdersHeaders: [
      {text: 'Дата', value: 'date'},
      {text: 'Название тура', value: 'title'},
      {text: 'Имя', value: 'firstName'},
      {text: 'Фамилия', value: 'lastName'},
      {text: 'Город', value: 'city'},
      {text: 'Страна', value: 'country'},
      {text: 'Телефон', value: 'phone'},
      {text: 'Email', value: 'email'},
      {text: 'Взрослые', value: 'adults'},
      {text: 'Дети', value: 'children'},
      {text: 'Дата приезда', value: 'dateOfArrival'},
      {text: 'Дата отъезда', value: 'departureDate'},
      {text: 'Сообщение', value: 'description'}
    ],
    orders: []
  },
  mutations: {
    updateMessagesAndOrdersField,
    FETCH_MESSAGES (state, payload) {
      state.messages = payload
    },
    FETCH_ORDERS (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async fetchMessages ({commit}) {
      const response = await messageService.fetchMessages()
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('FETCH_MESSAGES', response.data.messages)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async fetchOrders ({commit}) {
      const response = await orderService.fetchOrders()
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        commit('FETCH_ORDERS', response.data.orders)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async removeMessage ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await messageService.deleteMessage(payload)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Сообщение удалено успешно!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    },
    async removeOrder ({commit}, payload) {
      try {
        commit('CLEAR_SUCCESS')
        commit('CLEAR_ERROR')
        commit('SET_LOADING', true)
        await orderService.deleteOrder(payload)
        commit('SET_LOADING', false)
        commit('SET_SUCCESS', 'Заказ удален успешно!')
      } catch (err) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
        throw err
      }
    }
  },
  getters: {
    getMessagesAndOrdersField
  }
}
