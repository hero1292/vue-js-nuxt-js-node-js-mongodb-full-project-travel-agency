<template>
  <div>
    <h1 class="my-3 text-xs-center teal--text">Редактирование работника:</h1>
    <v-form ref="form" lazy-validation v-model="valid">
      <v-card class="mb-5">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-card-text>
              <v-text-field
                v-model="password"
                type="password"
                label="Введите новый пароль"
                :counter="6"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                type="password"
                :counter="6"
                :rules="[v => !!v || 'Повторите пароль',
                        v => v === this.password || 'Пароль не совпадает']"
                label="Повторите пароль"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                @click="$router.back()"
              >Отмена
              </v-btn>
              <v-btn
                color="teal"
                flat
                :loading="loading"
                :disabled="!valid"
                @click.native="editPassword"
              >Изменить
              </v-btn>
            </v-card-actions>
          </v-layout>
        </v-container>
      </v-card>
    </v-form>
  </div>
</template>

<script>
  import {createHelpers} from 'vuex-map-fields'

  const {mapFields} = createHelpers({
    getterType: 'getWorkersField',
    mutationType: 'updateWorkersField'
  })

  export default {
    computed: {
      ...mapFields([
        'valid',
        'worker.password',
        'confirmPassword',
        'passwordRules'
      ]),
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      editPassword () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('editPassword')
            .then(() => {
              this.password = ''
              this.confirmPassword = ''
            })
            .catch(() => {})
        }
      }
    }
  }
</script>
