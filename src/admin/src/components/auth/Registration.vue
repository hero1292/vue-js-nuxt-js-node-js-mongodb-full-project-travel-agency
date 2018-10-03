<template>
  <div>
    <h1 class="my-3 text-xs-center teal--text">Регистрация работника:</h1>
    <v-form ref="form" lazy-validation v-model="valid">
      <v-card class="mb-5">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-card-text>
              <v-text-field
                v-model="worker.firstName"
                type="text"
                label="Имя"
                :rules="rules"
                required
              ></v-text-field>
              <v-text-field
                v-model="worker.lastName"
                type="text"
                label="Фамилия"
                :rules="rules"
                required
              ></v-text-field>
              <v-text-field
                v-model="worker.position"
                type="text"
                label="Должность"
                :rules="rules"
                required
              ></v-text-field>
              <v-text-field
                v-model="worker.email"
                type="text"
                label="E-mail"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="worker.password"
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
                :rules="[v => !!v || 'Повторите пароль',
                        v => v === this.worker.password || 'Пароль не совпадает']"
                label="Повторите пароль"
                required
              ></v-text-field>
              <v-autocomplete
                v-if="$store.getters.user.roles === 'Super Admin'"
                :items="superAdminRolesItems"
                v-model="worker.roles"
                label="Роль"
                required
              ></v-autocomplete>
              <v-autocomplete
                v-if="$store.getters.user.roles === 'Admin'"
                :items="adminRolesItems"
                v-model="worker.roles"
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
                  ref="file"
                  type="file"
                  style="display: none;"
                  accept="image/*"
                  @change="onFileChange"
                >
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 md4 v-if="worker.avatar">
                <v-card class="ml-3">
                  <img :src="worker.avatar" height="200" width="100%" style="object-fit: contain">
                  <v-card-title primary-title>
                    <div>
                      <span class="headline">{{worker.avatar.name}}</span>
                    </div>
                  </v-card-title>
                  <v-btn
                    color="error"
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
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="teal"
                flat :loading="loading"
                :disabled="!valid"
                @click.native="send"
              >Отправить</v-btn>
            </v-card-actions>
          </v-layout>
        </v-container>
      </v-card>
    </v-form>
  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields'

  const { mapFields } = createHelpers({
    getterType: 'getWorkersField',
    mutationType: 'updateWorkersField'
  })

  export default {
    computed: {
      ...mapFields([
        'valid',
        'worker',
        'confirmPassword',
        'superAdminRolesItems',
        'adminRolesItems',
        'emailRules',
        'passwordRules',
        'confirmPasswordRules',
        'rules'
      ]),
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      send () {
        if (this.$refs.form.validate()) {
          console.log(this.worker)
          this.$store.dispatch('registration', this.worker)
            .then(() => {
              this.$store.commit('CLEAR_DATA_OF_WORKER', {
                firstName: '',
                lastName: '',
                position: '',
                email: '',
                password: '',
                roles: '',
                avatar: null
              })
              this.confirmPassword = ''
            })
            .catch(() => {
            })
        }
      },
      triggerUpload () {
        this.$refs.file.click()
      },
      onFileChange (event) {
        const image = event.target.files[0]

        const reader = new FileReader()
        reader.onload = e => {
          this.worker.avatar = reader.result
        }
        reader.readAsDataURL(image)
      },
      removeFile () {
        this.worker.avatar = null
      }
    }
  }
</script>
