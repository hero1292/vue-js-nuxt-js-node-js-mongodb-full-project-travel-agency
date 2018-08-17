<template>
  <v-container>
    <v-card v-if="!loading">
      <v-card-title>
        <h3>Работники</h3>
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
        :items="workers"
        :search="search"
        no-data-text="Работников пока нет"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.firstName }}</td>
          <td class="text-xs-right">{{ props.item.lastName }}</td>
          <td class="text-xs-right">{{ props.item.position }}</td>
          <td class="text-xs-right">{{ props.item.email }}</td>
          <td class="text-xs-right">{{ props.item.roles }}</td>
          <td class="text-xs-right">
            <v-btn
              small
              class="info"
              :loading="loading"
              :to="$route.path + '/' + props.item._id"
            >Изменить</v-btn>
            <v-btn
              small
              class="info"
              :loading="loading"
              :to="$route.path + '/change_password/' + props.item._id"
            >Изменить пароль</v-btn>
            <v-btn
              small
              class="error"
              :loading="loading"
              @click="removeWorker(props.item._id)"
            >Удалить</v-btn>
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
    getterType: 'getWorkersField',
    mutationType: 'updateWorkersField'
  })

  export default {
    computed: {
      ...mapFields([
        'search',
        'headers',
        'workers'
      ]),
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      fetchWorkers () {
        this.$store.dispatch('fetchWorkers')
          .then(() => {})
          .catch(() => {})
      },
      removeWorker (id) {
        this.$store.dispatch('removeWorker', id)
          .then(() => {
            this.fetchWorkers()
          })
          .catch(() => {})
      }
    },
    mounted () {
      this.fetchWorkers()
    }
  }
</script>
