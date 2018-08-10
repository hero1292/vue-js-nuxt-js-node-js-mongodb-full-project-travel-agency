<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark class="teal">
            <v-toolbar-title>Вход в "Админ панель"</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" validation @keyup.enter.native="login">
              <v-text-field
                prepend-icon="person"
                name="username"
                label="E-mail"
                type="text"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Пароль"
                type="password"
                v-model="password"
                :rules="passwordRules"
                :counter="6"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="teal"
              @click="login"
              :loading="loading"
              :disabled="!valid || loading"
            >Войти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        valid: false,
        email: '',
        password: '',
        emailRules: [
          v => !!v || 'Заполните поле E-mail',
          v => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/.test(v) || 'Заполните поле E-mail правильно'
        ],
        passwordRules: [
          v => !!v || 'Заполните поле пароль',
          v => (v && v.length >= 6) || 'Пароль должен состоять минимум из 6 символов'
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      error () {
        return this.$store.getters.error
      },
      success () {
        return this.$store.getters.success
      }
    },
    methods: {
      login () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }
          this.$store.dispatch('login', user)
            .then(() => {
              this.$router.push('/')
            })
            .catch(() => {
            })
        }
      }
    }
  }
</script>
