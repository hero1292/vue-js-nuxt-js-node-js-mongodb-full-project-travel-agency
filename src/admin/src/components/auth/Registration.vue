<template>
  <v-form enctype="multipart/form-data" ref="form" lazy-validation v-model="valid">
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card>
          <v-subheader class="headline">Регистрация пользователя:</v-subheader>
          <v-card-text>
            <v-text-field
              v-model="firstName"
              type="text"
              label="Имя"
              :rules="firstNameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              type="text"
              label="Фамилия"
              :rules="lastNameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="position"
              type="text"
              label="Должность"
              :rules="positionRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              type="text"
              label="E-mail"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="Пароль"
              :counter="6"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              type="password"
              :counter="6"
              :rules="confirmPasswordRules"
              label="Повторите пароль"
              required
            ></v-text-field>
            <v-autocomplete
              :items="rolesItems"
              v-model="roles"
              label="Роль"
              required
            ></v-autocomplete>
          </v-card-text>
          <v-layout row class="mb-3">
            <v-flex xs12>
              <v-btn class="warning" @click="triggerUpload">
                Upload
                <v-icon right dark>cloud_upload</v-icon>
              </v-btn>
              <input
                ref="fileInput"
                type="file"
                style="display: none;"
                accept="image/*"
                @change="onFileChange"
              >
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 md4 v-if="avatar !== null">
              <v-card class="ml-3">
                <img :src="imageSrc" height="200" width="100%">
                <v-card-title primary-title>
                  <div>
                    <span class="headline">{{avatar.name}}</span>
                  </div>
                </v-card-title>
                <v-btn
                  color="pink"
                  dark
                  small
                  bottom
                  left
                  fab
                  @click="removeFile"
                >
                  <v-icon>remove</v-icon>
                </v-btn>
              </v-card>
            </v-flex>
          </v-layout>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat :loading="loading" @click.native="send">Отправить</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
  import api from '../../plugins/api'

  export default {
    data () {
      return {
        valid: false,
        firstName: '',
        lastName: '',
        position: '',
        email: '',
        password: '',
        confirmPassword: '',
        roles: '',
        avatar: null,
        imageSrc: '',
        rolesItems: ['Super Admin', 'Admin', 'Moderator'],
        firstNameRules: [
          v => !!v || 'Заполните поле имя'
        ],
        lastNameRules: [
          v => !!v || 'Заполните поле фамилия'
        ],
        positionRules: [
          v => !!v || 'Заполните поле должность'
        ],
        emailRules: [
          v => !!v || 'Заполните поле E-mail',
          v => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/.test(v) || 'Заполните поле E-mail правильно'
        ],
        passwordRules: [
          v => !!v || 'Заполните поле пароль',
          v => (v && v.length >= 6) || 'Пароль должен состоять минимум из 6 символов'
        ],
        confirmPasswordRules: [
          v => !!v || 'Повторите пароль',
          v => v === this.password || 'Пароль не совпадает'
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
      async send () {
        if (this.$refs.form.validate()) {
          let formData = new FormData()

          formData.set('firstName', this.firstName)
          formData.append('lastName', this.lastName)
          formData.append('position', this.position)
          formData.append('email', this.email)
          formData.append('password', this.password)
          formData.append('roles', this.roles)
          formData.append('avatar', this.avatar)

          this.$store.dispatch('clearSuccess')
          this.$store.dispatch('clearError')
          this.$store.dispatch('setLoading', true)
          await api.post('/api/auth/registration', formData)
            .then(() => {
              this.$store.dispatch('setLoading', false)
              this.$store.dispatch('setSuccess', 'Пользователь успешно зарегистрирован!')
            })
            .catch(err => {
              this.$store.dispatch('setLoading', false)
              this.$store.dispatch('setError', err.response.data)
              console.log(err)
              throw err
            })
        }
      },
      triggerUpload () {
        this.$refs.fileInput.click()
      },
      onFileChange (event) {
        const file = event.target.files[0]

        const reader = new FileReader()
        reader.onload = e => {
          this.imageSrc = reader.result
        }
        reader.readAsDataURL(file)
        this.avatar = file
      },
      removeFile () {
        this.avatar = null
      }
    }
  }
</script>
