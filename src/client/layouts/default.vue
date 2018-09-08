<template>
    <v-app>
        <v-navigation-drawer
                :mini-variant.sync="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                fixed
                app
        >
            <v-list>
                <intl-link
                        v-for="(item, i) in items"
                        :key="i"
                        :to="{path: item.to}"
                        exact
                >
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </intl-link>
                <v-divider></v-divider>
                <v-layout class="mt-2" align-center justify-start row fill-height>
                    <intl-link :to="{lang: $store.state.locales[0]}">
                        <v-list-tile-avatar>
                            <img :src="getImgUrl('ru.png')">
                        </v-list-tile-avatar>
                    </intl-link>
                    <intl-link :to="{lang: $store.state.locales[1]}">
                        <v-list-tile-avatar>
                            <img :src="getImgUrl('us.png')">
                        </v-list-tile-avatar>
                    </intl-link>
                    <intl-link :to="{lang: $store.state.locales[2]}">
                        <v-list-tile-avatar>
                            <img :src="getImgUrl('arm.png')">
                        </v-list-tile-avatar>
                    </intl-link>
                </v-layout>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app :clipped-left="clipped">
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn
                    icon
                    @click.stop="miniVariant = !miniVariant"
            >
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <v-btn
                    icon
                    @click.stop="clipped = !clipped"
            >
                <v-icon>web</v-icon>
            </v-btn>
            <v-btn
                    icon
                    @click.stop="fixed = !fixed"
            >
                <v-icon>remove</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                    icon
                    @click.stop="rightDrawer = !rightDrawer"
            >
                <v-icon>menu</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>
        <v-navigation-drawer
                temporary
                :right="right"
                v-model="rightDrawer"
                fixed
        >
            <v-list>
                <v-list-tile @click.native="right = !right">
                    <v-list-tile-action>
                        <v-icon light>compare_arrows</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2017</span>
        </v-footer>
        <template v-if="error">
            <v-snackbar
                    :timeout="5000"
                    :multi-line="true"
                    color="error"
                    @input="closeError"
                    :value="true"
                    top
            >
                {{error}}
                <v-btn flat dark @click.native="closeError">Close</v-btn>
            </v-snackbar>
        </template>
        <template v-if="success">
            <v-snackbar
                    :timeout="5000"
                    :multi-line="true"
                    color="success"
                    :value="true"
                    top
            >
                {{success}}
            </v-snackbar>
        </template>
    </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          {icon: 'apps', title: this.$t('links.home'), to: '/'},
          {icon: 'beach_access', title: 'Въездные туры', to: 'incoming_tours'},
          {icon: 'beach_access', title: 'Выездные туры', to: 'outgoing_tours'},
          {icon: 'beach_access', title: 'Ежедневные туры', to: 'daily_tours'}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },
    computed: {
      error () {
        return this.$store.getters['shared/error']
      },
      success () {
        return this.$store.getters['shared/success']
      }
    },
    methods: {
      getImgUrl (...img) {
        return require('../static/flags/' + img)
      },
      closeError () {
        this.$store.dispatch('shared/clearError')
      }
    }
  }
</script>
