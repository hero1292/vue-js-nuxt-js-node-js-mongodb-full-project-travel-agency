<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-btn slot="activator" color="error" dark>{{$t('forms.contactForm')}}</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">{{$t('forms.contactForm')}}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" lazy-validation v-model="valid">
                        <v-flex xs12>
                            <v-text-field
                                    v-model="firstName"
                                    :rules="rules"
                                    :label="$t('forms.firstName')"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="lastName"
                                    :rules="rules"
                                    :label="$t('forms.lastName')"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="phone"
                                    :rules="rules"
                                    :label="$t('forms.phone')"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                    type="text"
                                    v-model="description"
                                    :label="$t('forms.message')"
                                    :counter="500"
                                    :rules="descriptionRules"
                                    required
                            ></v-textarea>
                        </v-flex>
                    </v-form>
                    <small>*{{$t('forms.required')}}</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="dialog = false">{{$t('forms.close')}}</v-btn>
                    <v-btn color="green darken-1" flat :loading="loading" @click.native="send">{{$t('forms.send')}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        valid: false,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        description: '',
        emailRules: [
          v => !!v || this.$t('forms.emailRules1'),
          v => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/.test(v) || this.$t('forms.emailRules2')
        ],
        descriptionRules: [
          v => !!v || this.$t('forms.messageRules1'),
          v => v.length <= 500 || this.$t('forms.messageRules2')
        ],
        rules: [
          v => !!v || this.$t('forms.rules')
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      async send () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('shared/clearSuccess')
          this.$store.dispatch('shared/clearError')
          this.$store.dispatch('shared/setLoading', true)
          await this.$api.post('/messages', {
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email,
            description: this.description
          })
            .then(() => {
              this.$store.dispatch('shared/setLoading', false)
              this.$store.dispatch('shared/setSuccess', this.$t('forms.messageSuccess'))
              this.dialog = false
            })
            .catch((err) => {
              this.$store.dispatch('shared/setLoading', false)
              this.$store.dispatch('shared/setError', this.$t('forms.error'))
              throw err
            })
        }
      }
    }
  }
</script>