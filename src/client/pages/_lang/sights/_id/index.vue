<template>
    <div>
        <v-container class="text-xs-center">
            <v-btn color="error" @click="$router.back()">{{$t('sights.prev')}}</v-btn>
            <v-btn color="error" :to="{name: 'lang-about'}">{{$t('sights.aboutArmenia')}}</v-btn>
        </v-container>
        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <h1 v-if="$route.params.lang === 'ru'" class="teal--text py-3">{{sight.title.ru}}</h1>
                <h1 v-if="$route.params.lang === 'en'" class="teal--text py-3">{{sight.title.en}}</h1>
                <h1 v-if="$route.params.lang === 'arm'" class="teal--text py-3">{{sight.title.arm}}</h1>
                <v-divider></v-divider>
                <v-flex xs12>
                    <v-container align-content-space-around justify-center>
                        <v-layout row wrap>
                            <v-flex xs12 sm4 v-for="(fact, i) in facts" :key="i">
                                <v-card class="elevation-0 transparent">
                                    <v-icon x-large class="teal--text">{{fact.icon}}</v-icon>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center red--text">{{fact.title}}</div>
                                    </v-card-title>
                                    <v-card-text v-if="fact.value"
                                                 class="text-xs-center subheading"
                                    >{{fact.value}} {{$t('sights.km')}}
                                    </v-card-text>
                                    <v-card-text
                                            v-if="$route.params.lang === 'ru'"
                                            class="text-xs-center subheading"
                                    >{{fact.ru}}
                                    </v-card-text>
                                    <v-card-text
                                            v-if="$route.params.lang === 'en'"
                                            class="text-xs-center subheading"
                                    >{{fact.en}}
                                    </v-card-text>
                                    <v-card-text
                                            v-if="$route.params.lang === 'arm'"
                                            class="text-xs-center subheading"
                                    >{{fact.arm}}
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
                <h3 class="teal--text py-3 headline">{{$t('sights.overview')}}</h3>
                <p v-if="$route.params.lang === 'ru'">{{sight.description.ru}}</p>
                <p v-if="$route.params.lang === 'en'">{{sight.description.en}}</p>
                <p v-if="$route.params.lang === 'arm'">{{sight.description.arm}}</p>
                <v-container align-content-space-around justify-center>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                            <v-card class="elevation-0 transparent">
                                <v-icon x-large class="teal--text">not_listed_location</v-icon>
                                <v-card-title primary-title class="layout justify-center">
                                    <div class="headline text-xs-center red--text">{{$t('sights.wayFromYerevan')}}</div>
                                </v-card-title>
                                <v-card-text
                                        v-if="$route.params.lang === 'ru'"
                                        class="text-xs-center subheading"
                                >{{sight.wayFromYerevan.ru}}
                                </v-card-text>
                                <v-card-text
                                        v-if="$route.params.lang === 'en'"
                                        class="text-xs-center subheading"
                                >{{sight.wayFromYerevan.en}}
                                </v-card-text>
                                <v-card-text
                                        v-if="$route.params.lang === 'arm'"
                                        class="text-xs-center subheading"
                                >{{sight.wayFromYerevan.arm}}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-card class="elevation-0 transparent">
                                <v-icon x-large class="teal--text">wb_sunny</v-icon>
                                <v-card-title primary-title class="layout justify-center">
                                    <div class="headline text-xs-center red--text">{{$t('sights.weather')}}</div>
                                </v-card-title>
                                <v-card-text
                                        v-if="$route.params.lang === 'ru'"
                                        class="text-xs-center subheading"
                                >{{sight.weather.ru}}
                                </v-card-text>
                                <v-card-text
                                        v-if="$route.params.lang === 'en'"
                                        class="text-xs-center subheading"
                                >{{sight.weather.en}}
                                </v-card-text>
                                <v-card-text
                                        v-if="$route.params.lang === 'arm'"
                                        class="text-xs-center subheading"
                                >{{sight.weather.arm}}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-layout
                        column
                        wrap
                        class="mb-3">
                    <v-flex xs12>
                        <h3 class="red--text py-3 headline">{{$t('sights.facts')}}:</h3>
                        <ul v-for="(fact, i) in sight.facts" :key="i">
                            <li class="mb-3" v-if="$route.params.lang === 'ru'">{{fact.text.ru}}</li>
                            <li class="mb-3" v-if="$route.params.lang === 'en'">{{fact.text.en}}</li>
                            <li class="mb-3" v-if="$route.params.lang === 'arm'">{{fact.text.arm}}</li>
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
    async asyncData (context) {
      const {params} = context.route

      if (!params.data) {
        params.data = await context.store.dispatch('sights/getSight', params)
          .then(() => {
          })
          .catch(() => {
          })
      }
    }
  }
</script>
