<template>
    <v-app>
        <v-navigation-drawer
                :clipped="clipped"
                v-model="drawer"
                fixed
                disable-resize-watcher
                app
                class="hidden-md-and-up"
        >
            <v-list>
                <intl-link
                        v-for="(link, i) in links"
                        :key="`A-${i}`"
                        :to="{locale: $i18n.locale, path: link.path}"
                        exact
                >
                    <v-list-tile-action>
                        <v-icon color="teal" medium v-html="link.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="link.title"></v-list-tile-title>
                    </v-list-tile-content>
                </intl-link>
                <intl-link
                        v-if="$i18n.locale === 'arm'"
                        :to="{locale: $i18n.locale, path: 'socpackages'}"
                >
                    <v-list-tile-action>
                        <v-icon color="teal" medium v-html="'fa-briefcase'"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Սոցփաթեթ'"></v-list-tile-title>
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
        <v-toolbar
                app
                color="primary darken-1"
                dark
                scrollOffScreen
                :clipped-left="clipped"
        >
            <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
            <router-link to="/">
                <v-avatar>
                    <img
                            src="../static/logo.jpg"
                            alt="Nice Tour"
                    >
                </v-avatar>
            </router-link>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <intl-btn
                        v-for="(link, i) in links"
                        :key="`B-${i}`"
                        :to="{locale: $i18n.locale, path: link.path}"
                        flat
                        small
                >
                    <v-icon left>{{link.icon}}</v-icon>
                    {{link.title}}
                </intl-btn>
                <intl-btn
                        v-if="$i18n.locale === 'arm'"
                        :to="{locale: $i18n.locale, path: 'socpackages'}"
                        flat
                        small
                >
                    <v-icon left>fa-briefcase</v-icon>
                    Սոցփաթեթ
                </intl-btn>
                <v-menu open-on-hover offset-y class="hidden-sm-and-down">
                    <v-btn
                            slot="activator"
                            dark
                            icon
                    >
                        <v-icon>fa-language</v-icon>
                    </v-btn>
                    <intl-link :to="{lang: $store.state.locales[0]}" flat>
                        <v-list-tile-avatar>
                            <img :src="getImgUrl('ru.png')">
                        </v-list-tile-avatar>
                    </intl-link>
                    <intl-link :to="{lang: $store.state.locales[1]}" flat>
                        <v-list-tile-avatar>
                            <img :src="getImgUrl('us.png')">
                        </v-list-tile-avatar>
                    </intl-link>
                    <intl-link :to="{lang: $store.state.locales[2]}" flat>
                        <v-list-tile-avatar>
                            <img :src="getImgUrl('arm.png')">
                        </v-list-tile-avatar>
                    </intl-link>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
        <v-content class="yellow accent-2">
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>
        <v-footer
                height="auto"
                class="primary darken-1"
        >
            <v-layout
                    justify-center
                    row
                    wrap
            >
                <intl-btn
                        v-for="(link, i) in links"
                        :key="`B-${i}`"
                        :to="{locale: $i18n.locale, path: link.path}"
                        flat
                        dark
                >{{link.title}}
                </intl-btn>
                <intl-btn
                        v-if="$i18n.locale === 'arm'"
                        :to="{locale: $i18n.locale, path: 'socpackages'}"
                        flat
                        dark
                >Սոցփաթեթ
                </intl-btn>
                <v-flex
                        primary
                        darken-2
                        py-3
                        text-xs-center
                        white--text
                        xs12
                >
                    &copy;2018 — <strong>Nice Tour</strong>
                </v-flex>
            </v-layout>
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
        clipped: true,
        drawer: false
      }
    },
    computed: {
      links () {
        return [
          {icon: 'apps', title: this.$t('links.home'), path: '/'},
          {icon: 'fa-file-text', title: this.$t('links.about'), path: 'about'},
          {icon: 'fa-arrow-left', title: this.$t('links.incomingTours'), path: 'incoming_tours'},
          {icon: 'fa-arrow-right', title: this.$t('links.outgoingTours'), path: 'outgoing_tours'},
          {icon: 'fa-calendar', title: this.$t('links.dailyTours'), path: 'daily_tours'},
          {icon: 'fa-id-badge', title: this.$t('links.privateTours'), path: 'private'},
          {icon: 'fa-phone', title: this.$t('links.contacts'), path: 'contacts'}
        ]
      },
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
