<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-btn slot="activator" color="error" dark>{{$t('forms.orderTour')}}</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">{{$t('forms.orderTour')}}</span>
                </v-card-title>
                <v-card-text>
                    <h3 class="title green--text mb-3">{{title}}</h3>
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
                                    v-model="city"
                                    :rules="rules"
                                    :label="$t('forms.city')"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="country"
                                    :rules="rules"
                                    :label="$t('forms.country')"
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
                            <v-text-field
                                    type="number"
                                    v-model="adults"
                                    :rules="rules"
                                    :label="$t('forms.adults')"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    type="number"
                                    v-model="children"
                                    :label="$t('forms.children')"
                            ></v-text-field>
                        </v-flex>
                        <template v-if="$route.params.tours !== 'daily_tours'">
                            <v-flex xs12>
                                <v-dialog
                                        ref="dateOfArrivalDialog"
                                        v-model="dateOfArrivalModal"
                                        :return-value.sync="dateOfArrival"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                >
                                    <v-text-field
                                            slot="activator"
                                            v-model="dateOfArrival"
                                            :label="$t('forms.dateOfArrival')"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker v-model="dateOfArrival" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                flat
                                                color="success"
                                                @click="dateOfArrivalModal = false"
                                        >{{$t('forms.close')}}</v-btn>
                                        <v-btn flat color="success"
                                               @click="$refs.dateOfArrivalDialog.save(dateOfArrival)">
                                            {{$t('forms.ok')}}
                                        </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-flex>
                            <v-flex xs12>
                                <v-dialog
                                        ref="departureDateDialog"
                                        v-model="departureDateModal"
                                        :return-value.sync="departureDate"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                >
                                    <v-text-field
                                            slot="activator"
                                            v-model="departureDate"
                                            :label="$t('forms.departureDate')"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker v-model="departureDate" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                flat
                                                color="success"
                                                @click="departureDateModal = false"
                                        >{{$t('forms.close')}}</v-btn>
                                        <v-btn flat color="success"
                                               @click="$refs.departureDateDialog.save(departureDate)">
                                            {{$t('forms.ok')}}
                                        </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-flex>
                        </template>
                        <v-flex xs12>
                            <v-textarea
                                    type="text"
                                    v-model="description"
                                    :label="$t('forms.notes')"
                                    :counter="500"
                                    :rules="descriptionRules"
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
    props: ['title'],
    data () {
      return {
        dialog: false,
        dateOfArrivalModal: false,
        departureDateModal: false,
        valid: false,
        firstName: '',
        lastName: '',
        city: '',
        country: '',
        phone: '',
        email: '',
        emailRules: [
          v => !!v || this.$t('forms.emailRules1'),
          v => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/.test(v) || this.$t('forms.emailRules2')
        ],
        adults: '',
        children: '',
        dateOfArrival: '',
        departureDate: '',
        description: '',
        descriptionRules: [
          v => v.length <= 500 || this.$t('forms.notesRules')
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
          await this.$api.post('/orders', {
            title: this.title,
            firstName: this.firstName,
            lastName: this.lastName,
            city: this.city,
            country: this.country,
            phone: this.phone,
            email: this.email,
            adults: this.adults,
            children: this.children,
            dateOfArrival: this.dateOfArrival,
            departureDate: this.departureDate,
            description: this.description
          })
            .then(() => {
              this.$store.dispatch('shared/setLoading', false)
              this.$store.dispatch('shared/setSuccess', this.$t('forms.orderSuccess'))
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