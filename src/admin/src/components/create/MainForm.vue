<template>
  <div class="my-3">
    <v-layout justify-center>
      <v-flex xs12 sm10>
        <v-tabs
          centered
          color="teal"
          dark
          icons-and-text
          show-arrows
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab href="#tab-1">
            Создать Тур
            <v-icon>beach_access</v-icon>
          </v-tab>
          <v-tab href="#tab-2">
            Создать Достопримечательность
            <v-icon>location_city</v-icon>
          </v-tab>
          <v-tab
            href="#tab-3"
            v-if="$store.getters.user.roles === 'Super Admin' || $store.getters.user.roles === 'Admin'">
            Регистрация пользователя
            <v-icon>person</v-icon>
          </v-tab>

          <v-tab-item
            :id="'tab-1'"
          >
            <app-tour></app-tour>
          </v-tab-item>
          <v-tab-item
            :id="'tab-2'"
          >
            <app-sight></app-sight>
          </v-tab-item>
          <v-tab-item
            :id="'tab-3'"
          >
            <app-registration></app-registration>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import createTour from './CreateTour.vue'
  import createSight from './CreateSight.vue'
  import Registration from '../auth/Registration.vue'

  export default {
    components: {
      appTour: createTour,
      appSight: createSight,
      appRegistration: Registration
    }
  }
</script>
