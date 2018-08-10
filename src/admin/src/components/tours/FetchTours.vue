<template>
  <div>
    <v-container class="text-xs-center">
      <v-btn color="error" :to="{path: '/tours'}">Все туры</v-btn>
      <v-menu
        open-on-hover
        transition="slide-y-transition"
        bottom
        color="success"
      >
        <v-btn
          slot="activator"
          color="success"
          dark
        >
          Въездные
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="(link, i) in links"
            :key="i"
            :to="link.url"
          >
            <v-list-tile-title>{{ link.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-container>
    <v-container grid-list-lg>
      <v-layout v-if="!loading" row wrap>
        <v-flex
          xs12
          sm6
          md4
          v-for="tour in tours"
          :key="tour._id"
        >
          <v-card>
            <v-card-media :src="getImgUrl(tour.images[0])" height="200"></v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{tour.title}}</h3>
                <div>{{tour.country}}</div>
                <div>{{tour.days}}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="error" :loading="loading" @click="removeTour(tour._id)">Удалить</v-btn>
              <v-btn flat color="info" :to="'tours_ru/' + tour._id">Изменить</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
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
  </div>
</template>

<script>
  import api from '../../services/api'

  export default {
    data() {
      return {
        tours: []
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      error() {
        return this.$store.getters.error
      },
      success() {
        return this.$store.getters.success
      },
      links() {
        return [
          {title: 'Все', url: {path: '/tours', query: {type: 'Incoming'}}},
          {title: 'Классические', url: {path: '/tours', query: {type: 'Classic'}}},
          {title: 'Региональные', url: {path: '/tours', query: {type: 'Regional'}}},
          {title: 'Приключенческие', url: {path: '/tours', query: {type: 'Adventure'}}},
          {title: 'Специальные', url: {path: '/tours', query: {type: 'Special'}}},
          {title: 'Зимние', url: {path: '/tours', query: {type: 'Winter'}}},
          {title: 'Бюджетные', url: {path: '/tours', query: {type: 'Budget'}}},
        ]
      }
    },
    methods: {
      async getTours() {
        let response;
        let query = this.$route.query.type
        try {
          if (!query) {
            this.$store.dispatch('clearError')
            this.$store.dispatch('setLoading', true)
            response = await api.get('/tours')
            this.$store.dispatch('setLoading', false)
          } else {
            this.$store.dispatch('clearError')
            this.$store.dispatch('setLoading', true)
            response = await api.get('/tours', {id: query})
            this.$store.dispatch('setLoading', false)
          }
        } catch (err) {
          this.$store.dispatch('setLoading', false)
          this.$store.dispatch('setError', 'Произошла какая то ошибка, попробуйте перезагрузить страницу!')
          throw err
        }
        this.tours = response.data
      },
      async removeTour(value) {
        this.$store.dispatch('clearSuccess')
        this.$store.dispatch('clearError')
        this.$store.dispatch('setLoading', true)
        await api.delete(`tours/${value}`)
          .then(() => {
            this.$store.dispatch('setLoading', false)
            this.$store.dispatch('setSuccess', 'Тур удален успешно!')
          })
          .catch((err) => {
            this.$store.dispatch('setLoading', false)
            this.$store.dispatch('setError', 'Произошла какая то ошибка, попробуйте перезагрузить страницу!')
            throw err
          })
        this.getTours()
      },
      getImgUrl(img) {
        return require('../../../../client/static/img/tours/' + img)
      }
    },
    mounted() {
      this.getTours()
    },
    watch: {
      '$route'() {
        this.getTours()
      }
    }
  }
</script>
