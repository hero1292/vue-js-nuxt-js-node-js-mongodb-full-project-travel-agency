<template>
  <div>
    <v-container class="text-xs-center">
      <h1 class="my-3 text-xs-center teal--text">Выездные туры:</h1>
      <v-flex xs12>
        <v-text-field
          type="text"
          v-model="search"
          label="Найти тур"
          required
          prepend-icon="search"
        ></v-text-field>
      </v-flex>
    </v-container>
    <v-container grid-list-lg>
      <v-layout v-if="!loading" row wrap>
        <v-flex
          xs12
          sm6
          md4
          v-for="tour in filterTours"
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
  import { createHelpers } from 'vuex-map-fields'

  const { mapFields } = createHelpers({
    getterType: 'getToursField',
    mutationType: 'updateToursField'
  })

  export default {
    computed: {
      ...mapFields([
        'search',
        'outgoingTours'
      ]),
      filterTours () {
        return this.outgoingTours.filter((tour) => {
          if (tour.title.ru) {
            return tour.title.ru.toLowerCase().match(this.search.toLowerCase())
          } else if (tour.title.en) {
            return tour.title.en.toLowerCase().match(this.search.toLowerCase())
          } else if (tour.title.arm) {
            return tour.title.arm.toLowerCase().match(this.search.toLowerCase())
          }
        })
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      fetchOutgoingTours () {
        this.$store.dispatch('fetchOutgoingTours')
          .then(() => {})
          .catch(() => {})
      },
      removeTour (params) {
        this.$store.dispatch('removeOutgoingTour', params)
          .then(() => {
            this.fetchOutgoingTours()
          })
          .catch(() => {})
      },
      getImgUrl (img) {
        return require('../../../../client/static/img/tours/' + img)
      },
      clearSearch () {
        this.search = ''
        return this.search
      }
    },
    mounted () {
      this.fetchOutgoingTours()
    },
    watch: {
      '$route' () {
        this.fetchOutgoingTours()
        this.clearSearch()
      }
    }
  }
</script>
