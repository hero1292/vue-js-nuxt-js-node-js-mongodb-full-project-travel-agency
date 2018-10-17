<template>
    <div>
        <v-container class="text-xs-center">
            <v-btn color="error" @click="$router.back()">{{$t('sights.prev')}}</v-btn>
            <v-btn color="primary" :to="{name: 'lang-about'}">{{$t('sights.aboutArmenia')}}</v-btn>
        </v-container>
        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <h1 v-if="$route.params.lang === 'ru'" class="display-1 primary--text py-3">{{sight.title.ru}}</h1>
                <h1 v-if="$route.params.lang === 'en'" class="display-1 primary--text py-3">{{sight.title.en}}</h1>
                <h1 v-if="$route.params.lang === 'arm'" class="display-1 primary--text py-3">{{sight.title.arm}}</h1>
                <v-divider></v-divider>
                <v-flex xs12>
                    <v-container align-content-space-around justify-center>
                        <v-layout row wrap>
                            <v-flex xs12 sm4 v-for="(fact, i) in facts" :key="i">
                                <v-card class="elevation-0 transparent">
                                    <v-icon x-large class="primary--text">{{fact.icon}}</v-icon>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center primary--text">{{fact.title}}</div>
                                    </v-card-title>
                                    <v-card-text v-if="fact.value"
                                                 class="text-xs-center subheading red--text"
                                    >{{fact.value}} {{$t('sights.km')}}
                                    </v-card-text>
                                    <v-card-text
                                            v-if="$route.params.lang === 'ru'"
                                            class="text-xs-center subheading red--text"
                                    >{{fact.ru}}
                                    </v-card-text>
                                    <v-card-text
                                            v-if="$route.params.lang === 'en'"
                                            class="text-xs-center subheading red--text"
                                    >{{fact.en}}
                                    </v-card-text>
                                    <v-card-text
                                            v-if="$route.params.lang === 'arm'"
                                            class="text-xs-center subheading red--text"
                                    >{{fact.arm}}
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
                <v-divider></v-divider>
                <h3 class="primary--text py-3 headline">{{$t('sights.overview')}}</h3>
                <p v-if="$route.params.lang === 'ru'" class="red--text subheading">{{sight.description.ru}}</p>
                <p v-if="$route.params.lang === 'en'" class="red--text subheading">{{sight.description.en}}</p>
                <p v-if="$route.params.lang === 'arm'" class="red--text subheading">{{sight.description.arm}}</p>
                <v-container align-content-space-around justify-center>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                            <v-card class="elevation-0 transparent">
                                <v-icon x-large class="primary--text">not_listed_location</v-icon>
                                <v-card-title primary-title class="layout justify-center">
                                    <div class="headline text-xs-center primary--text">{{$t('sights.wayFromYerevan')}}</div>
                                </v-card-title>
                                <v-card-text
                                        v-if="$route.params.lang === 'ru'"
                                        class="text-xs-center subheading red--text"
                                >{{sight.wayFromYerevan.ru}}
                                </v-card-text>
                                <v-card-text
                                        v-if="$route.params.lang === 'en'"
                                        class="text-xs-center subheading red--text"
                                >{{sight.wayFromYerevan.en}}
                                </v-card-text>
                                <v-card-text
                                        v-if="$route.params.lang === 'arm'"
                                        class="text-xs-center subheading red--text"
                                >{{sight.wayFromYerevan.arm}}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-card class="elevation-0 transparent">
                                <v-icon x-large class="primary--text">wb_sunny</v-icon>
                                <v-card-title primary-title class="layout justify-center">
                                    <div class="headline text-xs-center primary--text">{{$t('sights.weather')}}</div>
                                </v-card-title>
                                <v-card-text
                                        v-if="$route.params.lang === 'ru'"
                                        class="text-xs-center subheading red--text"
                                >{{sight.weather.ru}}
                                </v-card-text>
                                <v-card-text
                                        v-if="$route.params.lang === 'en'"
                                        class="text-xs-center subheading red--text"
                                >{{sight.weather.en}}
                                </v-card-text>
                                <v-card-text
                                        v-if="$route.params.lang === 'arm'"
                                        class="text-xs-center subheading red--text"
                                >{{sight.weather.arm}}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
                <no-ssr>
                    <carousel-3d :autoplay="true" :autoplay-timeout="5000" :height="200">
                        <slide v-for="(img, i) in sight.images" :key="i" :index="i">
                            <img :src="getImgUrl(img)">
                        </slide>
                    </carousel-3d>
                </no-ssr>
                <v-layout
                        column
                        wrap
                        class="mb-3">
                    <v-flex xs12>
                        <h3 class="primary--text py-3 headline">{{$t('sights.facts')}}:</h3>
                        <ul v-for="(fact, i) in sight.facts" :key="i">
                            <li class="mb-3 subheading red--text" v-if="$route.params.lang === 'ru'">{{fact.text.ru}}</li>
                            <li class="mb-3 subheading red--text" v-if="$route.params.lang === 'en'">{{fact.text.en}}</li>
                            <li class="mb-3 subheading red--text" v-if="$route.params.lang === 'arm'">{{fact.text.arm}}</li>
                        </ul>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  export default {
    computed: {
      sight () {
        return this.$store.getters['sights/sight']
      },
      facts () {
        return [
          {
            icon: 'map',
            title: this.$t('sights.region'),
            ru: this.sight.region.ru,
            en: this.sight.region.en,
            arm: this.sight.region.arm
          },
          {
            icon: 'linear_scale',
            title: this.$t('sights.distance'),
            value: this.sight.distance
          },
          {
            icon: 'location_city',
            title: this.$t('sights.type'),
            ru: this.sight.typeOfSight.ru,
            en: this.sight.typeOfSight.en,
            arm: this.sight.typeOfSight.arm
          }
        ]
      }
    },
    methods: {
      getImgUrl (img) {
        return require('../../../../../../images/sights/' + img)
      }
    },
    async asyncData (context) {
      const {params} = context.route

      if (!params.data) {
        params.data = await context.store.dispatch('sights/getSight', params)
          .then(() => {
          })
          .catch(() => {
          })
      }
    },
    head () {
      if (this.$route.params.lang === 'ru') {
        return {
          title: this.sight.title.ru
        }
      } else if (this.$route.params.lang === 'en') {
        return {
          title: this.sight.title.en
        }
      } else if (this.$route.params.lang === 'arm') {
        return {
          title: this.sight.title.arm
        }
      }
    }
  }
</script>
