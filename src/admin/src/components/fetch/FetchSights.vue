<template>
  <div>
    <v-container grid-list-lg>
      <v-flex xs12>
        <v-text-field
          type="text"
          v-model="search"
          label="Найти достопримечательность"
          required
          prepend-icon="search"
        ></v-text-field>
      </v-flex>
      <v-layout v-if="!loading" row wrap>
        <v-flex
          xs12
          sm6
          md4
          v-for="sight in filterSights"
          :key="sight._id"
        >
          <v-card>
            <!--<v-card-media :src="getImgUrl(sight.images[0])" height="200"></v-card-media>-->
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{sight.title.ru}}{{sight.title.en}}{{sight.title.arm}}</h3>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                color="error"
                :loading="loading"
                @click="removeSight({lang: $route.params.lang, id: sight._id})"
              >Удалить</v-btn>
              <v-btn
                flat
                color="info"
                :to="$route.path + '/' + sight._id"
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
    getterType: 'getSightsField',
    mutationType: 'updateSightsField'
  })

  export default {
    computed: {
      ...mapFields([
        'search',
        'sights'
      ]),
      filterSights () {
        return this.sights.filter((sight) => {
          if (sight.title.ru) {
            return sight.title.ru.toLowerCase().match(this.search.toLowerCase())
          } else if (sight.title.en) {
            return sight.title.en.toLowerCase().match(this.search.toLowerCase())
          } else if (sight.title.arm) {
            return sight.title.arm.toLowerCase().match(this.search.toLowerCase())
          }
        })
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      fetchSights () {
        this.$store.dispatch('fetchSights')
          .then(() => {})
          .catch(() => {})
      },
      async removeSight (params) {
        this.$store.dispatch('removeSight', params)
          .then(() => {
            this.fetchSights()
          })
          .catch(() => {})
      },
//      getImgUrl (img) {
//        return require('../../../../client/static/img/sights/' + img)
//      },
      clearSearch () {
        this.search = ''
        return this.search
      }
    },
    mounted () {
      this.fetchSights()
    },
    watch: {
      '$route' () {
        this.fetchSights()
        this.clearSearch()
      }
    }
  }
</script>
