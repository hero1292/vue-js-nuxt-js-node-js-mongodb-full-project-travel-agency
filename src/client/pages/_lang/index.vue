<template>
  <section>
    <v-layout
            column
            wrap
            class="my-5">
      <v-flex xs12>
        <h1 class="display-3 mb-3 text-xs-center primary--text">Nice Tour</h1>
        <v-container grid-list-xl>
          <v-layout row wrap align-content-space-between>
            <v-flex xs12 md6>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <h3 class="display-1 text-xs-center primary--text">{{$t('main.headline')}}</h3>
                </v-card-title>
                <v-card-text class="text-xs-center red--text subheading">{{$t('main.text')}}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md6>
              <v-card class="elevation-0 transparent thumb-wrap">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/XGemHjX4KF0?controls=0"></iframe>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container grid-list-xl>
          <v-layout row wrap align-content-space-between>
            <v-flex xs12 md6
                    v-for="(section, i) in sections"
                    :key="i"
            >
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <h3 class="display-1 text-xs-center primary--text">{{section.title}}</h3>
                </v-card-title>
                <v-card-text class="text-xs-center red--text subheading">{{section.description}}</v-card-text>
                <v-card-text class="text-xs-center">
                  <ul v-for="description in section.descriptions">
                    <v-icon medium class="primary--text">thumb_up</v-icon>
                    <li style="list-style-type: none">
                      <h3 class="primary--text mb-3 headline">{{description.title}}</h3>
                      <p class="red--text subheading">{{description.text}}</p>
                    </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
  export default {
    computed: {
      sections () {
        return [
          {
            title: this.$t('main.section_1.title'),
            description: this.$t('main.section_1.description')
          },
          {
            title: this.$t('main.section_2.title'),
            descriptions: [
              {
                title: this.$t('main.section_2.description_1.title'),
                text: this.$t('main.section_2.description_1.text')
              },
              {
                title: this.$t('main.section_2.description_2.title'),
                text: this.$t('main.section_2.description_2.text')
              },
              {
                title: this.$t('main.section_2.description_3.title'),
                text: this.$t('main.section_2.description_3.text')
              }
            ]
          }
        ]
      }
    },
    head () {
      return {
        title: this.$t('links.home')
      }
    }
  }
</script>

<style>
  .thumb-wrap {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
  }
  .thumb-wrap iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
