<template>
  <div>
    <template v-if="!$route.query.type">
      <v-container grid-list-lg>
        <h1 class="my-3 text-xs-center teal--text">Соц. пакеты:</h1>
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md4
            v-for="(link, i) in links"
            :key="i"
          >
            <v-card>
              <v-card-media :src="getMainImgUrl(link.imgSrc)" height="200"></v-card-media>
              <v-card-title primary-title>
                <router-link class="headline mt-3 green--text" :to="{path: link.path, query: {type: link.type}}">
                  {{link.title}}
                </router-link>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
    <template else>
      <v-container grid-list-lg>
        <v-container class="text-xs-center">
          <h1 class="my-3 text-xs-center teal--text">Отели:</h1>
          <v-btn color="error" :to="$route.path">Все соц. пакеты</v-btn>
        </v-container>
        <v-layout v-if="!loading" row wrap>
          <v-flex
            xs12
            sm6
            md4
            v-for="hotel in hotels"
            :key="hotel._id"
          >
            <v-card>
              <!--<v-card-media :src="getImgUrl(hotel.images[0])" height="200"></v-card-media>-->
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{hotel.title}}</h3>
                  <div>{{hotel.resort[0]}}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="error" :loading="loading" @click="removeHotel(hotel._id)">Удалить</v-btn>
                <v-btn flat color="info" :to="$route.path + '/' + hotel._id">Изменить</v-btn>
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
    </template>
  </div>
</template>

<script>
  import {createHelpers} from 'vuex-map-fields'

  const {mapFields} = createHelpers({
    getterType: 'getSocField',
    mutationType: 'updateSocField'
  })

  export default {
    computed: {
      ...mapFields([
        'hotels'
      ]),
      links () {
        return [
          {title: 'Цахкадзор', imgSrc: '1.jpg', path: this.$route.path, type: 'Tsaghkadzor'},
          {title: 'Агверан', imgSrc: '2.jpg', path: this.$route.path, type: 'Aghveran'},
          {title: 'Анкаван', imgSrc: '3.jpg', path: this.$route.path, type: 'Hankavan'},
          {title: 'Ахавнадзор', imgSrc: '4.jpg', path: this.$route.path, type: 'Ahavnadzor'},
          {title: 'Дилижан', imgSrc: '5.jpg', path: this.$route.path, type: 'Dilijan'},
          {title: 'Севан', imgSrc: '6.jpg', path: this.$route.path, type: 'Sevan'},
          {title: 'Степанаван', imgSrc: '7.jpg', path: this.$route.path, type: 'Stepanavan'},
          {title: 'Ванадзор', imgSrc: '8.jpg', path: this.$route.path, type: 'Vanadzor'},
          {title: 'Джермук', imgSrc: '9.jpg', path: this.$route.path, type: 'Djermuk'},
          {title: 'Бюракан', imgSrc: '10.jpg', path: this.$route.path, type: 'Byurakan'},
          {title: 'Иджеван', imgSrc: '11.jpg', path: this.$route.path, type: 'Idjevan'},
          {title: 'Ехегнадзор, Вайк', imgSrc: '12.jpg', path: this.$route.path, type: 'Yeghegnadzor_vayk'},
          {title: 'Арцах', imgSrc: '13.jpg', path: this.$route.path, type: 'Artsakh'},
          {title: 'Ахпат', imgSrc: '14.jpg', path: this.$route.path, type: 'Haghpat'},
          {title: 'Сюник', imgSrc: '15.jpg', path: this.$route.path, type: 'Syunik'},
          {title: 'Гюмри', imgSrc: '16.jpg', path: this.$route.path, type: 'Gyumri'}
        ]
      },
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
      fetchHotels () {
        this.$store.dispatch('fetchHotels')
          .then(() => {})
          .catch(() => {})
      },
      removeHotel (params) {
        this.$store.dispatch('removeHotel', params)
          .then(() => {
            this.fetchHotels()
          })
          .catch(() => {})
      },
      getMainImgUrl (img) {
        return require('../../../../client/static/socpackage/' + img)
      }
//      getImgUrl(img) {
//        return require('../../../../client/static/img/soc_packages/' + img)
//      }
    },
    mounted () {
      this.fetchHotels()
    },
    watch: {
      '$route' () {
        this.fetchHotels()
      }
    }
  }
</script>
