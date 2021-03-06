<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      v-if="$store.getters.user"
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="getImgUrl($store.getters.user.avatar || 'default_avatar.png')">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>
                {{$store.getters.user.firstName}} {{$store.getters.user.lastName}}
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{$store.getters.user.position}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile
          router
          :to="'/'"
          exact
        >
          <v-list-tile-action>
            <v-icon>apps</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Главная</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          router
          :to="'/create'"
          exact
        >
          <v-list-tile-action>
            <v-icon>note_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Создать</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-group
          prepend-icon="edit"
          value="true"
          v-model="active"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Редактирование</v-list-tile-title>
          </v-list-tile>
          <v-list-group
            v-for="(group, i) in groups"
            :key="i"
            no-action
            sub-group
            value="true"
            v-model="group.active"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>{{group.title}}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-for="(link, i) in group.links"
              :key="i"
              :to="link.to"
            >
              <v-list-tile-title>{{link.title}}</v-list-tile-title>
              <v-list-tile-action>
                <v-icon>{{link.icon}}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          router
          :to="link.to"
          exact
        >
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{link.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="$store.getters.user.roles === 'Super Admin'"
          router
          to="/workers"
          exact
        >
          <v-list-tile-action>
            <v-icon>assignment_ind</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Работники</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          @click="logout"
          exact
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Выйти</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      color="teal"
      dark
      scrollOffScreen
      :clipped-left="clipped"
      v-if="$store.getters.user"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <router-link to="/">
        <v-avatar>
          <img
            src="./assets/logo.jpg"
            alt="Nice Tour"
          >
        </v-avatar>
      </router-link>
      <v-toolbar-title>Админ Панель</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu open-on-hover nudge-bottom="10" offset-y class="hidden-sm-and-down">
        <v-btn
          slot="activator"
          color="white"
          dark
          flat
        >
          <v-avatar>
            <img
              :src="getImgUrl($store.getters.user.avatar || 'default_avatar.png')"
              alt="avatar"
            >
          </v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile
            @click="logout"
          >
            <v-list-tile-title>Выйти</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <transition enter-active-class="animated zoomIn"
                  leave-active-class="animated zoomOut"
                  mode="out-in"
      >
        <router-view/>
      </transition>
    </v-content>
    <v-footer app absolute inset>
      <v-flex
        class="teal"
        py-3
        text-xs-center
        white--text
        xs12
      >
        <span>Nice Tour&copy; 2018</span>
      </v-flex>
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
        miniVariant: true,
        active: false
      }
    },
    computed: {
      error () {
        return this.$store.getters.error
      },
      success () {
        return this.$store.getters.success
      },
      groups () {
        return [
          {
            title: 'Въездные туры',
            links: [
              {title: 'Туры (рус)', icon: 'beach_access', to: '/ru/incoming_tours'},
              {title: 'Туры (арм)', icon: 'beach_access', to: '/arm/incoming_tours'},
              {title: 'Туры (англ)', icon: 'beach_access', to: '/en/incoming_tours'}
            ],
            active: false
          },
          {
            title: 'Выездные туры',
            links: [
              {title: 'Туры (рус)', icon: 'beach_access', to: '/ru/outgoing_tours'},
              {title: 'Туры (арм)', icon: 'beach_access', to: '/arm/outgoing_tours'},
              {title: 'Туры (англ)', icon: 'beach_access', to: '/en/outgoing_tours'}
            ],
            active: false
          },
          {
            title: 'Ежед. туры',
            links: [
              {title: 'Туры (рус)', icon: 'beach_access', to: '/ru/daily_tours'},
              {title: 'Туры (арм)', icon: 'beach_access', to: '/arm/daily_tours'},
              {title: 'Туры (англ)', icon: 'beach_access', to: '/en/daily_tours'}
            ],
            active: false
          },
          {
            title: 'Достопримечательности',
            links: [
              {title: 'Достоприм. (рус)', icon: 'location_city', to: '/ru/sights'},
              {title: 'Достоприм. (арм)', icon: 'location_city', to: '/arm/sights'},
              {title: 'Достоприм. (англ)', icon: 'location_city', to: '/en/sights'}
            ],
            active: false
          }
        ]
      },
      links () {
        if (this.$store.getters.user.roles === 'Super Admin' || this.$store.getters.user.roles === 'Admin') {
          return [
            {title: 'Заказы', icon: 'list_alt', to: '/orders'},
            {title: 'Сообщения', icon: 'mail', to: '/messages'}
          ]
        }
      }
    },
    methods: {
      getImgUrl (img) {
        return require('../../../images/avatars/' + img)
      },
      closeError () {
        this.$store.dispatch('clearError')
      },
      logout () {
        this.$store.dispatch('logout')
          .then(() => {
            this.$store.commit('SET_USER', null)
            this.$router.push('/login')
          })
          .catch(() => {
          })
      }
    },
    name: 'App'
  }
</script>
