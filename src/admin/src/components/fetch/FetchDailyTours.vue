<template>
  <div>
    <v-container class="text-xs-center">
      <v-btn flat color="error" @click="allDays">Все дни</v-btn>
      <v-flex xs12 sm6 md4>
        <v-dialog
          ref="dialogDate"
          v-model="dateModal"
          :return-value.sync="searchDay"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            @focus="dateModal = true"
            slot="activator"
            v-model="searchDay"
            label="Выберите дату"
            prepend-icon="search"
            readonly
          ></v-text-field>
          <v-date-picker v-model="searchDay" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dateModal = false">Отмена</v-btn>
            <v-btn flat color="primary" @click="pushQuery(searchDay)">Выбрать</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-container>
    <v-container grid-list-lg>
      <v-layout v-if="!loading" row wrap>
        <v-flex
          xs12
          sm6
          md4
          v-for="tour in dailyTours"
          :key="tour._id"
        >
          <v-card>
            <!--<v-card-media :src="getImgUrl(tour.images[0])" height="200"></v-card-media>-->
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{tour.title.ru}}{{tour.title.en}}{{tour.title.arm}}</h3>
                <div>{{tour.country.ru}}{{tour.country.en}}{{tour.country.arm}}</div>
                <div>{{tour.days}}</div>
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
        'dateModal',
        'searchDay',
        'dailyTours'
      ]),
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      fetchDailyTours () {
        this.$store.dispatch('fetchDailyTours')
          .then(() => {})
          .catch(() => {})
      },
      removeTour (params) {
        this.$store.dispatch('removeDailyTour', params)
          .then(() => {
            this.fetchDailyTours()
          })
          .catch(() => {})
      },
      getImgUrl (img) {
        return require('../../../../client/static/img/tours/' + img)
      },
      pushQuery (searchDay) {
        this.$refs.dialogDate.save(searchDay)
        this.$router.push({path: this.$route.path, query: {type: this.searchDay}})
      },
      allDays () {
        this.searchDay = ''
        this.$router.push(this.$route.path)
      }
    },
    mounted () {
      this.fetchDailyTours()
    },
    watch: {
      '$route' () {
        this.fetchDailyTours()
      }
    }
  }
</script>
