<template>
    <div>
        <v-container v-if="$route.params.tours === 'incoming_tours'" class="text-xs-center">
            <h1 class="my-3 text-xs-center teal--text">{{$t('tours.headLine.incoming')}}:</h1>
            <v-btn color="error" :to="$route.path">{{$t('tours.buttons.all')}}</v-btn>
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
                    {{$t('tours.buttons.category')}}
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
            <v-flex xs12>
                <v-text-field
                        type="text"
                        v-model="search"
                        :label="$t('tours.search')"
                        required
                        prepend-icon="search"
                ></v-text-field>
            </v-flex>
        </v-container>
        <v-container v-if="$route.params.tours === 'outgoing_tours'" class="text-xs-center">
            <p class="red--text">
                {{$t('tours.headLine.sale')}}
            </p>
            <h1 class="my-3 text-xs-center teal--text">{{$t('tours.headLine.outgoing')}}:</h1>
            <v-flex xs12>
                <v-text-field
                        type="text"
                        v-model="search"
                        :label="$t('tours.search')"
                        required
                        prepend-icon="search"
                ></v-text-field>
            </v-flex>
        </v-container>
        <v-container v-if="$route.params.tours === 'daily_tours'" class="text-xs-center">
            <h1 class="my-3 text-xs-center teal--text">{{$t('tours.headLine.daily')}}:</h1>
            <v-btn color="error" @click="allDays">{{$t('tours.buttons.allDays')}}</v-btn>
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
                            :label="$t('tours.searchDay')"
                            prepend-icon="search"
                            readonly
                    ></v-text-field>
                    <v-date-picker v-model="searchDay" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="teal" @click="dateModal = false">Отмена</v-btn>
                        <v-btn flat color="teal" @click="pushQuery(searchDay)">Выбрать</v-btn>
                    </v-date-picker>
                </v-dialog>
            </v-flex>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex
                        xs12
                        sm6
                        md4
                        v-for="tour in filterTours"
                        :key="tour._id"
                >
                    <v-card>
                        <!--<v-card-media-->
                                <!--v-if="$route.params.tours === 'incoming_tours'"-->
                                <!--:src="require(`../../../../../images/incoming_tours/${tour.images[0]}`)"-->
                                <!--height="200"-->
                        <!--&gt;</v-card-media>-->
                        <!--<v-card-media-->
                                <!--v-if="$route.params.tours === 'outgoing_tours'"-->
                                <!--:src="require(`../../../../../images/outgoing_tours/${tour.images[0]}`)"-->
                                <!--height="200"-->
                        <!--&gt;</v-card-media>-->
                        <!--<v-card-media-->
                                <!--v-if="$route.params.tours === 'daily_tours'"-->
                                <!--:src="require(`../../../../../images/daily_tours/${tour.images[0]}`)"-->
                                <!--height="200"-->
                        <!--&gt;</v-card-media>-->
                        <v-card-title teal-title>
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
                                <p
                                        v-if="$route.params.lang === 'ru'"
                                        class="subheading mb-3 text-xs-center teal--text"
                                >{{tour.country.ru}}</p>
                                <p
                                        v-if="$route.params.lang === 'en'"
                                        class="subheading mb-3 text-xs-center teal--text"
                                >{{tour.country.en}}</p>
                                <p
                                        v-if="$route.params.lang === 'arm'"
                                        class="subheading mb-3 text-xs-center teal--text"
                                >{{tour.country.arm}}</p>
                                <template v-if="$route.params.tours === 'daily_tours'">
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
                                    >{{$t('tours.date')}}: {{tour.date}}</p>
                                    <p
                                            class="subheading mb-0 text-xs-center teal--text"
                                    >{{$t('tours.start')}}: {{tour.start}}</p>
                                </template>
                                <p
                                        v-if="$route.params.lang === 'ru'"
                                        class="subheading mb-3 text-xs-center"
                                        style="color: #E53935"
                                >{{tour.daysAndNights.ru}}</p>
                                <p
                                        v-if="$route.params.lang === 'en'"
                                        class="subheading mb-3 text-xs-center"
                                        style="color: #E53935"
                                >{{tour.daysAndNights.en}}</p>
                                <p
                                        v-if="$route.params.lang === 'arm'"
                                        class="subheading mb-3 text-xs-center"
                                        style="color: #E53935"
                                >{{tour.daysAndNights.arm}}</p>
                                <p class="subheading mb-0 text-xs-center teal--text">{{$t('tours.price')}}:</p>
                                <template v-if="$route.params.tours === 'incoming_tours'">
                                    <p
                                            class="body-2 text-xs-center"
                                    >{{$t('tours.priceStart')}} {{tour.prices.amd}} AMD / {{tour.prices.rur}} RUB /
                                        {{tour.prices.usd}} USD / {{tour.prices.eur}} EUR
                                    </p>
                                </template>
                                <template v-else>
                                    <p
                                            class="body-2 text-xs-center"
                                    >{{tour.prices.amd}} AMD / {{tour.prices.rur}} RUB / {{tour.prices.usd}} USD /
                                        {{tour.prices.eur}} EUR
                                    </p>
                                </template>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    flat
                                    color="teal"
                                    :to="$route.path + '/' + tour._id"
                            >{{$t('tours.buttons.info')}}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        dateModal: false,
        search: '',
        searchDay: ''
      }
    },
    computed: {
      filterTours () {
        return this.tours.filter((tour) => {
          if (tour.title.ru) {
            return tour.title.ru.toLowerCase().match(this.search.toLowerCase())
          } else if (tour.title.en) {
            return tour.title.en.toLowerCase().match(this.search.toLowerCase())
          } else if (tour.title.arm) {
            return tour.title.arm.toLowerCase().match(this.search.toLowerCase())
          }
        })
      },
      links () {
        return [
          {title: this.$t('tours.buttons.classic'), url: {path: this.$route.path, query: {type: 'Classic'}}},
          {title: this.$t('tours.buttons.regional'), url: {path: this.$route.path, query: {type: 'Regional'}}},
          {title: this.$t('tours.buttons.adventure'), url: {path: this.$route.path, query: {type: 'Adventure'}}},
          {title: this.$t('tours.buttons.special'), url: {path: this.$route.path, query: {type: 'Special'}}},
          {title: this.$t('tours.buttons.winter'), url: {path: this.$route.path, query: {type: 'Winter'}}},
          {title: this.$t('tours.buttons.budget'), url: {path: this.$route.path, query: {type: 'Budget'}}}
        ]
      }
    },
    methods: {
      pushQuery (searchDay) {
        this.$refs.dialogDate.save(searchDay)
        this.$router.push({path: this.$route.path, query: {type: this.searchDay}})
      },
      allDays () {
        this.searchDay = ''
        this.$router.push(this.$route.path)
      }
    },
    async fetch (context) {
      const {params} = context.route
      const query = context.query

      if (!params.data) {
        params.data = await context.store.dispatch('tours/fetchTours', {params, query})
          .then(() => {})
          .catch(() => {})
      }

      return {
        tours: params.data
      }
    },
    watchQuery: ['type'],
    head () {
      if (this.$route.params.tours === 'incoming_tours') {
        return {
          title: this.$t('links.incomingTours')
        }
      } else if (this.$route.params.tours === 'outgoing_tours') {
        return {
          title: this.$t('links.outgoingTours')
        }
      } else if (this.$route.params.tours === 'daily_tours') {
        return {
          title: this.$t('links.dailyTours')
        }
      }
    },
    mounted () {
      console.log(this)
    }
  }
</script>
