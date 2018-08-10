<template>
  <v-container>
    <v-card v-if="!loading">
      <v-card-title>
        <h3>Заказы</h3>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        no-data-text="Заказов пока нет"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.date }}</td>
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.firstName }}</td>
          <td class="text-xs-right">{{ props.item.lastName }}</td>
          <td class="text-xs-right">{{ props.item.city }}</td>
          <td class="text-xs-right">{{ props.item.country }}</td>
          <td class="text-xs-right">{{ props.item.phone }}</td>
          <td class="text-xs-right">{{ props.item.email }}</td>
          <td class="text-xs-right">{{ props.item.adults }}</td>
          <td class="text-xs-right">{{ props.item.children }}</td>
          <td class="text-xs-right">{{ props.item.dateOfArrival }}</td>
          <td class="text-xs-right">{{ props.item.departureDate }}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="text-xs-right">
            <v-btn class="error" :loading="loading" @click="removeOrder(props.item._id)">Удалить</v-btn>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          По Вашему запросу "{{ search }}" ничего не найдено.
        </v-alert>
      </v-data-table>
    </v-card>
    <v-layout v-else>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          :size="100"
          :width="4"
          color="teal"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import orders from '../../services/order_service'

  export default {
    data () {
      return {
        search: '',
        headers: [
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
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      error () {
        return this.$store.getters.error
      },
      success () {
        return this.$store.getters.success
      }
    },
    methods: {
      async getOrders () {
        try {
          this.$store.dispatch('clearError')
          this.$store.dispatch('setLoading', true)
          const response = await orders.fetchOrders()
          this.orders = response.data.orders
          this.$store.dispatch('setLoading', false)
        } catch (err) {
          this.$store.dispatch('setLoading', false)
          this.$store.dispatch('setError', 'Произошла какая то ошибка, попробуйте перезагрузить страницу!')
          throw err
        }
      },
      async removeOrder (id) {
        this.$store.dispatch('clearSuccess')
        this.$store.dispatch('clearError')
        this.$store.dispatch('setLoading', true)
        await orders.deleteOrder(id)
          .then(() => {
            this.$store.dispatch('setLoading', false)
            this.$store.dispatch('setSuccess', 'Заказ удален успешно!')
          })
          .catch((err) => {
            this.$store.dispatch('setLoading', false)
            this.$store.dispatch('setError', 'Произошла какая то ошибка, попробуйте перезагрузить страницу!')
            throw err
          })
        this.getOrders()
      }
    },
    mounted () {
      this.getOrders()
    }
  }
</script>
