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
        :headers="messagesHeaders"
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
            <v-btn small class="error" :loading="loading" @click="removeMessage(props.item._id)">Удалить</v-btn>
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
  import { createHelpers } from 'vuex-map-fields'

  const { mapFields } = createHelpers({
    getterType: 'getMessagesAndOrdersField',
    mutationType: 'updateMessagesAndOrdersField'
  })

  export default {
    computed: {
      ...mapFields([
        'search',
        'messagesHeaders',
        'messages'
      ]),
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      fetchMessages () {
        this.$store.dispatch('fetchMessages')
          .then(() => {})
          .catch(() => {})
      },
      removeMessage (id) {
        this.$store.dispatch('removeMessage', id)
          .then(() => {
            this.fetchMessages()
          })
          .catch(() => {})
      }
    },
    mounted () {
      this.fetchMessages()
    }
  }
</script>
