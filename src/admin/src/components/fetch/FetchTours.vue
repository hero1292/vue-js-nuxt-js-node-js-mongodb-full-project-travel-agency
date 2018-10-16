<template>
  <div>
    <v-container class="text-xs-center">
      <h1 v-if="$route.params.tours === 'incoming_tours'" class="my-3 text-xs-center teal--text">Въездные туры:</h1>
      <h1 v-if="$route.params.tours === 'outgoing_tours'" class="my-3 text-xs-center teal--text">Выездные туры:</h1>
      <h1 v-if="$route.params.tours === 'daily_tours'" class="my-3 text-xs-center teal--text">Ежедневные туры:</h1>
      <template v-if="$route.params.tours === 'incoming_tours'">
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
      </template>
      <template v-if="$route.params.tours === 'incoming_tours' || $route.params.tours === 'outgoing_tours'">
        <v-flex xs12>
          <v-text-field
            type="text"
            v-model="search"
            label="Найти тур"
            required
            prepend-icon="search"
          ></v-text-field>
        </v-flex>
      </template>
      <template v-if="$route.params.tours === 'daily_tours'">
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
      </template>
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
            <v-card-media :src="getImgUrl(tour.images[0])" height="200"></v-card-media>
            <v-card-title primary-title>
              <div>
                <h3
                  v-if="$route.params.lang === 'ru'"
                  class="headline mb-1 text-xs-center"
                  style="color: #E53935"
                >{{tour.title.ru}}</h3>
                <h3
                  v-if="$route.params.lang === 'en'"
                  class="headline mb-1 text-xs-center"
                  style="color: #E53935"
                >{{tour.title.en}}</h3>
                <h3
                  v-if="$route.params.lang === 'arm'"
                  class="headline mb-1 text-xs-center"
                  style="color: #E53935"
                >{{tour.title.arm}}</h3>
                <template v-if="$route.params.tours === 'daily_tours' && tour.repeat">
                  <p
                    v-if="$route.params.lang === 'ru'"
                    class="subheading mb-0 text-xs-center"
                    style="color: #E53935"
                  >{{tour.repeat.ru}}</p>
                  <p
                    v-if="$route.params.lang === 'en'"
                    class="subheading mb-0 text-xs-center"
                    style="color: #E53935"
                  >{{tour.repeat.en}}</p>
                  <p
                    v-if="$route.params.lang === 'arm'"
                    class="subheading mb-0 text-xs-center"
                    style="color: #E53935"
                  >{{tour.repeat.arm}}</p>
                  <p
                    class="subheading mb-0 text-xs-center teal--text"
                  >Дата: {{tour.date}}</p>
                </template>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                color="error"
                :loading="loading"
                @click="removeTour({tours: $route.params.tours, id: tour._id})"
              >Удалить
              </v-btn>
              <v-btn
                flat
                color="info"
                :to="$route.path + '/' + tour._id"
              >Изменить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 class="my-3 text-xs-center">
          <v-btn
            small
            fab
            color="error"
            v-show="page != 1"
            @click="page--"
          > << </v-btn>
          <v-btn
            small
            fab
            color="primary"
            v-for="(pageNumber, i) in pages.slice(page-1, page+5)"
            :key="i"
            @click="page = pageNumber"
          > {{pageNumber}} </v-btn>
          <v-btn
            small
            fab
            color="error"
            @click="page++"
            v-show="page < pages.length"
          > >> </v-btn>
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
  import {createHelpers} from 'vuex-map-fields'

  const {mapFields} = createHelpers({
    getterType: 'getToursField',
    mutationType: 'updateToursField'
  })

  export default {
    data () {
      return {
        page: 1,
        perPage: 9,
        pages: []
      }
    },
    computed: {
      ...mapFields([
        'search',
        'dateModal',
        'searchDay',
        'tours'
      ]),
      filterTours () {
        if (!this.search) {
          return this.paginate(this.tours)
        } else {
          return this.tours.filter((tour) => {
            if (tour.title.ru) {
              return tour.title.ru.toLowerCase().match(this.search.toLowerCase())
            } else if (tour.title.en) {
              return tour.title.en.toLowerCase().match(this.search.toLowerCase())
            } else if (tour.title.arm) {
              return tour.title.arm.toLowerCase().match(this.search.toLowerCase())
            }
          })
        }
      },
      loading () {
        return this.$store.getters.loading
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
      async fetchTours () {
        if (this.tours.length >= 0) {
          await this.$store.dispatch('fetchTours', {
            lang: this.$route.params.lang,
            tours: this.$route.params.tours,
            query: this.$route.query.type
          })
            .then(() => {
            })
            .catch(() => {
            })
        }
      },
      async removeTour (params) {
        await this.$store.dispatch('removeTour', {tours: params.tours, id: params.id})
          .then(() => {
            this.fetchTours()
          })
          .catch(() => {
          })
      },
      clearSearch () {
        this.search = ''
        return this.search
      },
      pushQuery (searchDay) {
        this.$refs.dialogDate.save(searchDay)
        this.$router.push({path: this.$route.path, query: {type: this.searchDay}})
      },
      allDays () {
        this.searchDay = ''
        this.$router.push(this.$route.path)
      },
      getImgUrl (img) {
        return require('../../../../../images/tours/' + img)
      },
      setPages () {
        this.page = 1
        this.pages = []
        const numberOfPages = Math.ceil(this.tours.length / this.perPage)
        for (let i = 1; i <= numberOfPages; i++) {
          this.pages.push(i)
        }
      },
      paginate (tours) {
        const from = (this.page * this.perPage) - this.perPage
        const to = (this.page * this.perPage)
        return tours.slice(from, to)
      }
    },
    mounted () {
      this.fetchTours()
    },
    watch: {
      '$route' () {
        this.fetchTours()
        this.clearSearch()
      },
      tours () {
        this.setPages()
      }
    }
  }
</script>
