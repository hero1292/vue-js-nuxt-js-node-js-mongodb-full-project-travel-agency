<template>
    <div>
        <v-container class="text-xs-center">
            <v-btn color="error" :to="{name: 'lang-about'}">{{$t('sights.aboutArmenia')}}</v-btn>
        </v-container>
        <v-container grid-list-lg>
            <h1 class="my-3 text-xs-center teal--text">{{$t('sights.headLine')}}:</h1>
            <v-flex xs12>
                <v-text-field
                        type="text"
                        v-model="search"
                        :label="$t('sights.search')"
                        required
                        prepend-icon="search"
                ></v-text-field>
            </v-flex>
            <v-layout row wrap>
                <v-flex
                        xs12
                        sm6
                        md4
                        v-for="sight in filterSights"
                        :key="sight._id"
                >
                    <v-card>
                        <v-card-media :src="getImgUrl(sight.images[0])" height="200"></v-card-media>
                        <v-card-title primary-title>
                            <div>
                                <h3
                                        v-if="$route.params.lang === 'ru'"
                                        class="headline mb-1 text-xs-center"
                                        style="color: #E53935"
                                >{{sight.title.ru}}</h3>
                                <h3
                                        v-if="$route.params.lang === 'en'"
                                        class="headline mb-1 text-xs-center"
                                        style="color: #E53935"
                                >{{sight.title.en}}</h3>
                                <h3
                                        v-if="$route.params.lang === 'arm'"
                                        class="headline mb-1 text-xs-center"
                                        style="color: #E53935"
                                >{{sight.title.arm}}</h3>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    flat
                                    color="teal"
                                    :to="$route.path + '/' + sight._id"
                            >{{$t('sights.info')}}</v-btn>
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
        </v-container>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
        perPage: 9,
        pages: [],
        search: ''
      }
    },
    computed: {
      sights () {
        return this.$store.getters['sights/sights']
      },
      filterSights () {
        if (!this.search) {
          return this.paginate(this.sights)
        } else {
          return this.sights.filter((sight) => {
            if (sight.title.ru) {
              return sight.title.ru.toLowerCase().match(this.search.toLowerCase())
            } else if (sight.title.en) {
              return sight.title.en.toLowerCase().match(this.search.toLowerCase())
            } else if (sight.title.arm) {
              return sight.title.arm.toLowerCase().match(this.search.toLowerCase())
            }
          })
        }
      }
    },
    methods: {
      clearSearch () {
        this.search = ''
        return this.search
      },
      getImgUrl (img) {
        return require('../../../../../images/sights/' + img)
      },
      setPages () {
        const numberOfPages = Math.ceil(this.sights.length / this.perPage)
        for (let i = 1; i <= numberOfPages; i++) {
          this.pages.push(i)
        }
      },
      paginate (sights) {
        const from = (this.page * this.perPage) - this.perPage
        const to = (this.page * this.perPage)
        return sights.slice(from, to)
      }
    },
    async fetch (context) {
      const {params} = context.route

      if (!params.data) {
        params.data = await context.store.dispatch('sights/fetchSights', params)
          .then(() => {})
          .catch(() => {})
      }
    },
    watch: {
      '$route' () {
        this.clearSearch()
      }
    },
    mounted () {
      this.setPages()
    },
    head () {
      return {
        title: this.$t('sights.headLine')
      }
    }
  }
</script>
