<template>
  <div>
    <v-container class="text-xs-center">
      <v-btn color="error" :to="$route.path">Все туры</v-btn>
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
            <!--<v-card-media :src="getImgUrl(tour.images[0])" height="200"></v-card-media>-->
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{tour.title.ru}}{{tour.title.en}}{{tour.title.arm}}</h3>
                <div>{{tour.country.ru}}{{tour.country.en}}{{tour.country.arm}}</div>
                <div>{{tour.days}} дней / {{tour.nights}} ночей</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                color="error"
                :loading="loading"
                @click="removeTour({lang: $route.params.lang, id: tour._id})"
              >Удалить</v-btn>
              <v-btn
                flat
                color="info"
                :to="$route.path + '/' + tour._id"
              >Изменить</v-btn>
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
  import toursService from '../../services/tours_service'

  export default {
    data () {
      return {
        tours: []
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
      },
      links () {
        return [
          {title: 'Классические', url: {path: this.$route.path, query: {type: 'Classic'}}},
          {title: 'Региональные', url: {path: this.$route.path, query: {type: 'Regional'}}},
          {title: 'Приключенческие', url: {path: this.$route.path, query: {type: 'Adventure'}}},
          {title: 'Специальные', url: {path: this.$route.path, query: {type: 'Special'}}},
          {title: 'Зимние', url: {path: this.$route.path, query: {type: 'Winter'}}},
          {title: 'Бюджетные', url: {path: this.$route.path, query: {type: 'Budget'}}}
        ]
      }
    },
    methods: {
      async getTours () {
        let response
        let query = this.$route.query.type
        let lang = this.$route.params.lang
        try {
          if (lang === 'ru' || lang === 'en' || lang === 'arm') {
            if (!query) {
              this.$store.dispatch('clearError')
              this.$store.dispatch('setLoading', true)
              response = await toursService.fetchIncomingTours({lang})
              this.$store.dispatch('setLoading', false)
            } else {
              this.$store.dispatch('clearError')
              this.$store.dispatch('setLoading', true)
              response = await toursService.fetchIncomingToursByTypes({lang, id: query})
              this.$store.dispatch('setLoading', false)
            }
          } else {
            this.$router.back()
          }
        } catch (err) {
          this.$store.dispatch('setLoading', false)
          this.$store.dispatch('setError', 'Произошла какая то ошибка, попробуйте перезагрузить страницу!')
          throw err
        }
        this.tours = response.data
      },
      async removeTour (params) {
        this.$store.dispatch('clearSuccess')
        this.$store.dispatch('clearError')
        this.$store.dispatch('setLoading', true)
        await toursService.deleteIncomingTour(params)
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
      getImgUrl (img) {
        return require('../../../../client/static/img/tours/' + img)
      }
    },
    mounted () {
      this.getTours()
    },
    watch: {
      '$route' () {
        this.getTours()
      }
    }
  }
</script>
