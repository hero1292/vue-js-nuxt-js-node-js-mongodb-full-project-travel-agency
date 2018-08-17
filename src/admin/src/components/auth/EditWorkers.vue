<template>
  <div>
    <h1 class="my-3 text-xs-center teal--text">Редактирование работника:</h1>
    <v-form enctype="multipart/form-data" ref="form" lazy-validation v-model="valid">
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
              <v-autocomplete
                :items="rolesItems"
                v-model="worker.roles"
                label="Роль"
                required
              ></v-autocomplete>
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
                @click.native="editWorker"
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
        'worker',
        'confirmPassword',
        'rolesItems',
        'emailRules',
        'passwordRules',
        'rules'
      ]),
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      getWorker () {
        this.$store.dispatch('getWorker')
          .then(() => {})
          .catch(() => {})
      },
      editWorker () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('editWorker')
            .then(() => {})
            .catch(() => {})
        }
      }
    },
    mounted () {
      this.getWorker()
    }
  }
</script>
