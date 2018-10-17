<template>
    <div>
        <v-flex xs12 class="text-xs-center">
            <h1 class="primary--text my-3 display-1">{{$t('contacts.headLine')}}</h1>
            <v-divider></v-divider>
            <v-flex xs12>
                <p class="mt-3 primary--text headline">{{$t('contacts.workingHoursTitle')}}</p>
                <p class="mb-3 red--text subheading">{{$t('contacts.workingHoursText')}}</p>
                <p class="my-3 primary--text headline">{{$t('contacts.info')}}</p>
                <p class="mb-0 red--text subheading">+374 (98) 90 20 70</p>
                <p class="mb-0 red--text subheading">+374 (41) 66 17 77</p>
                <p class="red--text subheading">+374 (95) 16 76 71</p>
            </v-flex>
            <p class="primary--text mt-5 mb-3 headline">{{$t('contacts.address')}}</p>
            <app-contact-form class="my-3"></app-contact-form>
        </v-flex>
    </div>
</template>

<script>
  import ContactForm from '../../../components/ContactForm.vue'

  export default {
    components: {
      appContactForm: ContactForm
    },
    head () {
      return {
        title: this.$t('links.contacts')
      }
    }
  }
</script>
