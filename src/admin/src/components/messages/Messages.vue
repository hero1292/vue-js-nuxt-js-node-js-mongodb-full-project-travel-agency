<template>
  <v-container>
    <v-card v-if="!loading">
      <v-card-title>
        <h3>Сообщения</h3>
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
        :items="messages"
        :search="search"
        no-data-text="Сообщений пока нет"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.date }}</td>
          <td class="text-xs-right">{{ props.item.firstName }}</td>
          <td class="text-xs-right">{{ props.item.lastName }}</td>
          <td class="text-xs-right">{{ props.item.phone }}</td>
          <td class="text-xs-right">{{ props.item.email }}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="text-xs-right">
            <v-btn class="error" :loading="loading" @click="removeMessage(props.item._id)">Удалить</v-btn>
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
          color="light-green accent-4"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import api from '../../plugins/api'

  export default {
    data () {
      return {
        search: '',
        headers: [
          {text: 'Дата', value: 'date'},
          {text: 'Имя', value: 'firstName'},
          {text: 'Фамилия', value: 'lastName'},
          {text: 'Телефон', value: 'phone'},
          {text: 'Email', value: 'email'},
          {text: 'Сообщение', value: 'description'}
        ],
        messages: []
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
      async getMessages () {
        try {
          this.$store.dispatch('clearError')
          this.$store.dispatch('setLoading', true)
          const response = await api.get('/messages')
          this.messages = response.data.messages
          this.$store.dispatch('setLoading', false)
        } catch (err) {
          this.$store.dispatch('setLoading', false)
          this.$store.dispatch('setError', 'Произошла какая то ошибка, попробуйте перезагрузить страницу!')
          throw err
        }
      },
      async removeMessage (id) {
        this.$store.dispatch('clearSuccess')
        this.$store.dispatch('clearError')
        this.$store.dispatch('setLoading', true)
        await api.delete(`/messages/${id}`)
          .then(() => {
            this.$store.dispatch('setLoading', false)
            this.$store.dispatch('setSuccess', 'Сообщение удалено успешно!')
          })
          .catch((err) => {
            this.$store.dispatch('setLoading', false)
            this.$store.dispatch('setError', 'Произошла какая то ошибка, попробуйте перезагрузить страницу!')
            throw err
          })
        this.getMessages()
      }
    },
    mounted () {
      this.getMessages()
    }
  }
</script>
