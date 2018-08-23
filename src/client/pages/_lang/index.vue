<template>
  <section>
    <v-layout
            column
            wrap
            class="my-5">
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-layout row wrap align-content-space-between>
            <v-flex xs12 md6
                    v-for="(section, i) in sections"
                    :key="i"
            >
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center">{{section.title}}</div>
                </v-card-title>
                <v-card-text class="text-xs-center">{{section.description}}</v-card-text>
                <v-card-text class="text-xs-center">
                  <ul v-for="description in section.descriptions">
                    <v-icon class="green--text">thumb_up</v-icon>
                    <li style="list-style-type: none">
                      <h3 class="green--text">{{description.title}}</h3>
                      <p>{{description.text}}</p>
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
    }
  }
</script>
