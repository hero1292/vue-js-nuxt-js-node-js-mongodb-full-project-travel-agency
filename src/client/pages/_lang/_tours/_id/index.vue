<template>
    <div>
        <v-container class="text-xs-center">
            <v-btn color="error" @click="$router.back()">{{$t('tours.buttons.prev')}}</v-btn>
        </v-container>
        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <h1 v-if="$route.params.lang === 'ru'" class="teal--text py-3">{{tour.title.ru}}</h1>
                <h1 v-if="$route.params.lang === 'en'" class="teal--text py-3">{{tour.title.en}}</h1>
                <h1 v-if="$route.params.lang === 'arm'" class="teal--text py-3">{{tour.title.arm}}</h1>
                <template v-if="$route.params.tours === 'daily_tours'">
                    <div
                            class="red--text subheading mb-0"
                    >{{$t('tours.start')}}: {{tour.start}} / {{$t('tours.end')}}: {{tour.end}}
                        <v-tooltip right>
                            <v-icon
                                    slot="activator"
                                    color="teal"
                                    dark
                                    small
                            >help
                            </v-icon>
                            <span>{{$t('tours.time')}}</span>
                        </v-tooltip>
                    </div>
                    <p v-if="$route.params.lang === 'ru'" class="red--text subheading">{{tour.repeat.ru}}</p>
                    <p v-if="$route.params.lang === 'en'" class="red--text subheading">{{tour.repeat.en}}</p>
                    <p v-if="$route.params.lang === 'arm'" class="red--text subheading">{{tour.repeat.arm}}</p>
                </template>
                <p v-if="$route.params.lang === 'ru'" class="red--text subheading">{{tour.country.ru}}</p>
                <p v-if="$route.params.lang === 'en'" class="red--text subheading">{{tour.country.en}}</p>
                <p v-if="$route.params.lang === 'arm'" class="red--text subheading">{{tour.country.arm}}</p>
                <p v-if="$route.params.lang === 'ru'" class="title">{{tour.daysAndNights.ru}}</p>
                <p v-if="$route.params.lang === 'en'" class="title">{{tour.daysAndNights.en}}</p>
                <p v-if="$route.params.lang === 'arm'" class="title">{{tour.daysAndNights.arm}}</p>
                <v-divider></v-divider>
                <h3 class="teal--text py-3 headline">{{$t('tours.price')}}</h3>
                <template v-if="$route.params.tours === 'incoming_tours'">
                    <p
                            class="subheading red--text"
                    >{{$t('tours.priceStart')}} {{tour.prices.amd}} AMD / {{tour.prices.rur}} RUB /
                        {{tour.prices.usd}} USD / {{tour.prices.eur}} EUR
                    </p>
                </template>
                <template v-else>
                    <p
                            class="subheading red--text"
                    >{{tour.prices.amd}} AMD / {{tour.prices.rur}} RUB / {{tour.prices.usd}} USD / {{tour.prices.eur}} EUR
                    </p>
                </template>
                <h3 class="teal--text py-3 headline">{{$t('tours.overview')}}</h3>
                <p v-if="$route.params.lang === 'ru'">{{tour.description.ru}}</p>
                <p v-if="$route.params.lang === 'en'">{{tour.description.en}}</p>
                <p v-if="$route.params.lang === 'arm'">{{tour.description.arm}}</p>
                <v-divider></v-divider>
                <v-layout
                        column
                        wrap
                        class="my-3">
                    <v-flex xs12>
                        <v-container grid-list-xl align-content-space-around>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 md4 v-for="(fact, i) in facts" :key="i">
                                    <template>
                                        <v-card class="elevation-0 transparent">
                                            <v-icon x-large class="teal--text">{{fact.icon}}</v-icon>
                                            <v-card-title primary-title class="layout justify-center">
                                                <div class="headline text-xs-center red--text">{{fact.title}}</div>
                                            </v-card-title>
                                            <v-card-text v-if="fact.typeRu"
                                                         class="text-xs-center subheading"
                                            >{{fact.typeRu}}</v-card-text>
                                            <v-card-text v-if="fact.typeEn"
                                                         class="text-xs-center subheading"
                                            >{{fact.typeEn}}</v-card-text>
                                            <v-card-text v-if="fact.typeArm"
                                                         class="text-xs-center subheading"
                                            >{{fact.typeArm}}</v-card-text>
                                            <v-card-text v-if="fact.value"
                                                         class="text-xs-center subheading"
                                            >{{fact.value}}</v-card-text>
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
                                    </template>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-tabs
                        v-if="tabShow"
                        slot="extension"
                        v-model="tab"
                        color="teal"
                        dark
                        centered
                        show-arrows
                        class="mt-5"
                >
                    <v-tabs-slider color="red"></v-tabs-slider>
                    <v-tab
                            v-for="(days, i) in tour.arrayOfDays"
                            :key="i"
                    >
                        {{$t('tours.day')}} {{ ++i }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items cycle v-model="tab" class="elevation-3 mb-5">
                    <v-tab-item
                            v-for="(days, i) in tour.arrayOfDays"
                            :key="i"
                    >
                        <v-card flat>
                            <v-card-text v-if="$route.params.lang === 'ru'" class="red--text">{{ days.way.ru }}
                            </v-card-text>
                            <v-card-text v-if="$route.params.lang === 'en'" class="red--text">{{ days.way.en }}
                            </v-card-text>
                            <v-card-text v-if="$route.params.lang === 'arm'" class="red--text">{{ days.way.arm }}
                            </v-card-text>
                            <v-card-text v-if="$route.params.lang === 'ru'">{{ days.text.ru }}</v-card-text>
                            <v-card-text v-if="$route.params.lang === 'en'">{{ days.text.en }}</v-card-text>
                            <v-card-text v-if="$route.params.lang === 'arm'">{{ days.text.arm }}</v-card-text>
                            <v-card-text
                                    v-if="$route.params.lang === 'ru'"
                                    class="red--text"
                            >{{$t('tours.overnight')}}: {{ days.overnight.ru }}
                            </v-card-text>
                            <v-card-text
                                    v-if="$route.params.lang === 'en'"
                                    class="red--text"
                            >{{$t('tours.overnight')}}: {{ days.overnight.en }}
                            </v-card-text>
                            <v-card-text
                                    v-if="$route.params.lang === 'arm'"
                                    class="red--text"
                            >{{$t('tours.overnight')}}: {{ days.overnight.arm }}
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
                <no-ssr>
                    <carousel-3d :autoplay="true" :autoplay-timeout="5000" :height="200">
                        <slide v-for="(img, i) in tour.images" :key="i" :index="i">
                            <img :src="getImgUrl(img)">
                        </slide>
                    </carousel-3d>
                </no-ssr>
                <v-layout
                        column
                        wrap
                        class="mb-3">
                    <v-flex xs12>
                        <v-container grid-list-xl>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 md4 v-if="show1">
                                    <h3 class="red--text py-3 headline">{{$t('tours.priceInclude')}}:</h3>
                                    <ul v-for="(priceInclude, i) in tour.priceIncludes" :key="i">
                                        <li v-if="$route.params.lang === 'ru'">{{priceInclude.valueOfInc.ru}}</li>
                                        <li v-if="$route.params.lang === 'en'">{{priceInclude.valueOfInc.en}}</li>
                                        <li v-if="$route.params.lang === 'arm'">{{priceInclude.valueOfInc.arm}}</li>
                                    </ul>
                                </v-flex>
                                <v-flex xs12 sm6 md4 v-if="show2">
                                    <h3 class="red--text py-3 headline">{{$t('tours.priceExclude')}}:</h3>
                                    <ul v-for="(priceExclude, i) in tour.priceExcludes" :key="i">
                                        <li v-if="$route.params.lang === 'ru'">{{priceExclude.valueOfExc.ru}}</li>
                                        <li v-if="$route.params.lang === 'en'">{{priceExclude.valueOfExc.en}}</li>
                                        <li v-if="$route.params.lang === 'arm'">{{priceExclude.valueOfExc.arm}}</li>
                                    </ul>
                                </v-flex>
                                <v-flex xs12 sm6 md4 v-if="show3">
                                    <h3 class="red--text py-3 headline">{{$t('tours.pleaseNote')}}:</h3>
                                    <ul v-for="(pleaseNote, i) in tour.pleaseNotes" :key="i">
                                        <li v-if="$route.params.lang === 'ru'">{{pleaseNote.valueOfNote.ru}}</li>
                                        <li v-if="$route.params.lang === 'en'">{{pleaseNote.valueOfNote.en}}</li>
                                        <li v-if="$route.params.lang === 'arm'">{{pleaseNote.valueOfNote.arm}}</li>
                                    </ul>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-layout>
                <app-order-form v-if="$route.params.lang === 'ru'" :title="tour.title.ru"></app-order-form>
                <app-order-form v-if="$route.params.lang === 'en'" :title="tour.title.en"></app-order-form>
                <app-order-form v-if="$route.params.lang === 'arm'" :title="tour.title.arm"></app-order-form>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  import OrderForm from '../../../../components/OrderForm.vue'

  export default {
    data () {
      return {
        tab: null,
        tabShow: true,
        show1: true,
        show2: true,
        show3: true
      }
    },
    computed: {
      tour () {
        return this.$store.getters['tours/tour']
      },
      facts () {
        if (this.$route.params.tours === 'daily_tours') {
          return [
            {
              icon: 'map',
              title: this.$t('tours.typeOfTour'),
              typeRu: this.tour.typesOfDailyTour.ru,
              typeEn: this.tour.typesOfDailyTour.en,
              typeArm: this.tour.typesOfDailyTour.arm
            },
            {
              icon: 'access_time',
              title: this.$t('tours.daysAndNights'),
              ru: this.tour.daysAndNights.ru,
              en: this.tour.daysAndNights.en,
              arm: this.tour.daysAndNights.arm
            },
            {
              icon: 'group',
              title: this.$t('tours.groupSize'),
              value: this.tour.groupSize
            },
            {
              icon: 'hotel',
              title: this.$t('tours.accommodation'),
              ru: this.tour.accommodation.ru,
              en: this.tour.accommodation.en,
              arm: this.tour.accommodation.arm
            },
            {
              icon: 'wb_sunny',
              title: this.$t('tours.bestPeriod'),
              ru: this.tour.bestPeriod.ru,
              en: this.tour.bestPeriod.en,
              arm: this.tour.bestPeriod.arm
            },
            {
              icon: 'flag',
              title: this.$t('tours.startEndPoint'),
              ru: this.tour.startEndPoint.ru,
              en: this.tour.startEndPoint.en,
              arm: this.tour.startEndPoint.arm
            }
          ]
        } else {
          return [
            {
              icon: 'access_time',
              title: this.$t('tours.daysAndNights'),
              ru: this.tour.daysAndNights.ru,
              en: this.tour.daysAndNights.en,
              arm: this.tour.daysAndNights.arm
            },
            {
              icon: 'group',
              title: this.$t('tours.groupSize'),
              value: this.tour.groupSize
            },
            {
              icon: 'hotel',
              title: this.$t('tours.accommodation'),
              ru: this.tour.accommodation.ru,
              en: this.tour.accommodation.en,
              arm: this.tour.accommodation.arm
            },
            {
              icon: 'wb_sunny',
              title: this.$t('tours.bestPeriod'),
              ru: this.tour.bestPeriod.ru,
              en: this.tour.bestPeriod.en,
              arm: this.tour.bestPeriod.arm
            },
            {
              icon: 'flag',
              title: this.$t('tours.startEndPoint'),
              ru: this.tour.startEndPoint.ru,
              en: this.tour.startEndPoint.en,
              arm: this.tour.startEndPoint.arm
            }
          ]
        }
      }
    },
    methods: {
      getImgUrl (img) {
        return require('../../../../../../images/tours/' + img)
      }
    },
    async asyncData (context) {
      const {params} = context.route

      if (!params.data) {
        params.data = await context.store.dispatch('tours/getTour', params)
          .then(() => {})
          .catch(() => {})
      }
    },
    mounted () {
      if (this.$route.params.tours === 'outgoing_tours' || this.tour.arrayOfDays.length === 0) {
        this.tabShow = false
      }
      if (this.tour.priceIncludes.length === 0) {
        this.show1 = false
      }
      if (this.tour.priceExcludes.length === 0) {
        this.show2 = false
      }
      if (this.tour.pleaseNotes.length === 0) {
        this.show3 = false
      }
    },
    components: {
      appOrderForm: OrderForm
    },
    head () {
      if (this.$route.params.lang === 'ru') {
        return {
          title: this.tour.title.ru
        }
      } else if (this.$route.params.lang === 'en') {
        return {
          title: this.tour.title.en
        }
      } else if (this.$route.params.lang === 'arm') {
        return {
          title: this.tour.title.arm
        }
      }
    }
  }
</script>
