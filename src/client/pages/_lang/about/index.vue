<template>
    <div>
        <v-container class="text-xs-center">
            <v-btn color="error" :to="{name: 'lang-sights'}">{{$t('aboutArmenia.sights')}}</v-btn>
        </v-container>
            <v-flex xs12 class="text-xs-center">
                <h1 class="teal--text my-3">{{$t('aboutArmenia.headLine')}}</h1>
                <v-divider></v-divider>
                <v-flex xs12>
                    <p class="my-3 subheading">{{$t('aboutArmenia.description')}}</p>
                    <p class="mb-5 red--text subheading">{{$t('aboutArmenia.citation')}}</p>
                </v-flex>
                <no-ssr>
                    <carousel-3d :autoplay="true" :autoplay-timeout="5000" :height="200">
                        <slide v-for="(slide, i) in slides" :key="i" :index="i">
                            <img :src="getImgUrl(slide.img)">
                        </slide>
                    </carousel-3d>
                </no-ssr>
                <h3 class="teal--text mt-5 mb-3 headline">{{$t('aboutArmenia.info')}}</h3>
                <v-flex xs12 v-for="(fact, i) in facts" :key="i">
                    <p class="my-0 subheading red--text">{{fact.title}}
                        <span class="pl-1 black--text">{{fact.text}}</span>
                    </p>
                </v-flex>
            </v-flex>
    </div>
</template>

<script>
  export default {
    computed: {
      facts () {
        return [
          {
            title: this.$t('aboutArmenia.officialName'),
            text: this.$t('aboutArmenia.officialNameText')
          },
          {
            title: this.$t('aboutArmenia.government'),
            text: this.$t('aboutArmenia.governmentText')
          },
          {
            title: this.$t('aboutArmenia.headOfTheState'),
            text: this.$t('aboutArmenia.headOfTheStateText')
          },
          {
            title: this.$t('aboutArmenia.territory'),
            text: this.$t('aboutArmenia.territoryText')
          },
          {
            title: this.$t('aboutArmenia.borders'),
            text: this.$t('aboutArmenia.bordersText')
          },
          {
            title: this.$t('aboutArmenia.population'),
            text: this.$t('aboutArmenia.populationText')
          },
          {
            title: this.$t('aboutArmenia.capital'),
            text: this.$t('aboutArmenia.capitalText')
          },
          {
            title: this.$t('aboutArmenia.religion'),
            text: this.$t('aboutArmenia.religionText')
          },
          {
            title: this.$t('aboutArmenia.stateLanguage'),
            text: this.$t('aboutArmenia.stateLanguageText')
          },
          {
            title: this.$t('aboutArmenia.administrativeDivision'),
            text: this.$t('aboutArmenia.administrativeDivisionText')
          },
          {
            title: this.$t('aboutArmenia.nationalCurrency'),
            text: this.$t('aboutArmenia.nationalCurrencyText')
          },
          {
            title: this.$t('aboutArmenia.nationalMotto'),
            text: this.$t('aboutArmenia.nationalMottoText')
          },
          {
            title: this.$t('aboutArmenia.nationalSymbols'),
            text: this.$t('aboutArmenia.nationalSymbolsText')
          }
        ]
      },
      slides () {
        return [
          {img: '1.jpg'},
          {img: '2.jpg'},
          {img: '3.jpg'},
          {img: '4.jpg'},
          {img: '5.jpg'},
          {img: '6.jpg'},
          {img: '7.jpg'},
          {img: '8.jpg'},
          {img: '9.jpg'},
          {img: '10.jpg'}
        ]
      }
    },
    methods: {
      getImgUrl (img) {
        return require('../../../static/socpackage/' + img)
      }
    }
  }
</script>
