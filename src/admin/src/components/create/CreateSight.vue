<template>
  <div>
    <h1 class="my-3 text-xs-center teal--text">Создать достопримечательность:</h1>
    <v-form ref="form" lazy-validation v-model="valid">
      <v-card class="mb-5">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-subheader class="title">Основная информация:</v-subheader>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Название достопримечательности:</v-subheader>
              <v-text-field
                type="text"
                v-model="sight.title.ru"
                label="Введите название достопримечательности на русском"
                :counter="5"
                :rules="titleRules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="sight.title.en"
                label="Введите название достопримечательности на английском"
                :counter="5"
                :rules="titleRules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="sight.title.arm"
                label="Введите название достопримечательности на армянском"
                :counter="5"
                :rules="titleRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Регион:</v-subheader>
              <v-text-field
                type="text"
                v-model="sight.region.ru"
                label="Введите регион на русском"
                :rules="firstRules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="sight.region.en"
                label="Введите регион на английском"
                :rules="firstRules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="sight.region.arm"
                label="Введите регион на армянском"
                :rules="firstRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Расстояние от Еревана:</v-subheader>
              <v-text-field
                type="number"
                v-model="sight.distance"
                label="Введите расстояние от Еревана"
                :rules="firstRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Тип достопримечательности:</v-subheader>
              <v-text-field
                type="text"
                v-model="sight.typeOfSight.ru"
                label="Введите тип достопримечательности на русском"
                :rules="firstRules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="sight.typeOfSight.en"
                label="Введите тип достопримечательности на английском"
                :rules="firstRules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="sight.typeOfSight.arm"
                label="Введите тип достопримечательности на армянском"
                :rules="firstRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Описание достопримечательности:</v-subheader>
              <v-textarea
                type="text"
                v-model="sight.description.ru"
                label="Введите краткое описание на русском"
                :counter="10"
                :rules="descriptionRules"
                required
              ></v-textarea>
              <v-textarea
                type="text"
                v-model="sight.description.en"
                label="Введите краткое описание на английском"
                :counter="10"
                :rules="descriptionRules"
                required
              ></v-textarea>
              <v-textarea
                type="text"
                v-model="sight.description.arm"
                label="Введите краткое описание на армянском"
                :counter="10"
                :rules="descriptionRules"
                required
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Как добраться от Еревана:</v-subheader>
              <v-textarea
                type="text"
                v-model="sight.wayFromYerevan.ru"
                label="Опишите, как добраться от Еревана на русском"
                :rules="secondRules"
                :counter="5"
                required
              ></v-textarea>
              <v-textarea
                type="text"
                v-model="sight.wayFromYerevan.en"
                label="Опишите, как добраться от Еревана на английском"
                :rules="secondRules"
                :counter="5"
                required
              ></v-textarea>
              <v-textarea
                type="text"
                v-model="sight.wayFromYerevan.arm"
                label="Опишите, как добраться от Еревана на армянском"
                :rules="secondRules"
                :counter="5"
                required
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Погода:</v-subheader>
              <v-textarea
                type="text"
                v-model="sight.weather.ru"
                label="Опишите погоду на русском"
                :rules="secondRules"
                :counter="5"
                required
              ></v-textarea>
              <v-textarea
                type="text"
                v-model="sight.weather.en"
                label="Опишите погоду на английском"
                :rules="secondRules"
                :counter="5"
                required
              ></v-textarea>
              <v-textarea
                type="text"
                v-model="sight.weather.arm"
                label="Опишите погоду на армянском"
                :rules="secondRules"
                :counter="5"
                required
              ></v-textarea>
            </v-flex>
            <v-flex xs12 v-for="(fact, index) in sight.facts" :key="fact.id">
              <v-subheader class="subheading red--text">Факт({{++index}}):</v-subheader>
              <v-card>
                <v-card-actions>
                  <v-btn
                    color="error"
                    dark
                    absolute
                    small
                    bottom
                    right
                    fab
                    @click="removeFacts(index)"
                  >
                    <v-icon>remove</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-textarea
                  type="text"
                  label="Опишите факты на русском"
                  :rules="secondRules"
                  v-model="fact.text.ru"
                  :counter="5"
                ></v-textarea>
                <v-textarea
                  type="text"
                  label="Опишите факты на английском"
                  :rules="secondRules"
                  v-model="fact.text.en"
                  :counter="5"
                ></v-textarea>
                <v-textarea
                  type="text"
                  label="Опишите факты на армянском"
                  :rules="secondRules"
                  v-model="fact.text.arm"
                  :counter="5"
                ></v-textarea>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-btn class="error" @click="addFacts">
                Добавить поле (Факты)
                <v-icon right dark>note_add</v-icon>
              </v-btn>
            </v-flex>
            <v-subheader class="title">Добавить изображения:</v-subheader>
            <v-flex xs12>
              <v-btn class="warning" @click="triggerUpload">
                Upload
                <v-icon right dark>cloud_upload</v-icon>
              </v-btn>
              <input
                ref="files"
                type="file"
                multiple
                style="display: none;"
                accept="image/*"
                @change="onFileChange"
              >
            </v-flex>
            <v-container grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12
                        sm6
                        md4
                        v-for="(image, index) in sight.images" :key="index"
                >
                  <v-card>
                    <img :src="image.data" height="200" width="100%" style="object-fit: contain">
                    <v-card-title primary-title>
                      <div>
                        <span class="headline mb-0">{{image.name}}</span>
                      </div>
                    </v-card-title>
                    <v-btn
                      color="error"
                      dark
                      small
                      bottom
                      left
                      fab
                      @click="removeFile(index)"
                    >
                      <v-icon>remove</v-icon>
                    </v-btn>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-layout>
          <v-card-actions>
            <small class="red--text">*обязательные поля</small>
            <v-spacer></v-spacer>
            <v-btn
              class="teal white--text mt-3"
              @click="send"
              :loading="loading"
              :disabled="!valid || !sight.images"
            >Опубликовать
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-form>
  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields'

  const { mapFields } = createHelpers({
    getterType: 'getSightsField',
    mutationType: 'updateSightsField'
  })

  export default {
    computed: {
      ...mapFields([
        'valid',
        'sight',
        'titleRules',
        'descriptionRules',
        'firstRules',
        'secondRules'
      ]),
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      async send () {
        if (this.$refs.form.validate()) {
          await this.$store.dispatch('addSight', this.sight)
            .then(() => {
              this.$store.commit('CLEAR_DATA_OF_SIGHT', {
                title: {ru: '', en: '', arm: ''},
                region: {ru: '', en: '', arm: ''},
                distance: '',
                typeOfSight: {ru: '', en: '', arm: ''},
                description: {ru: '', en: '', arm: ''},
                wayFromYerevan: {ru: '', en: '', arm: ''},
                weather: {ru: '', en: '', arm: ''},
                facts: [{text: {ru: '', en: '', arm: ''}}],
                images: []
              })
            })
            .catch(() => {
            })
        }
      },
      triggerUpload () {
        this.$refs.files.click()
      },
      onFileChange () {
        const uploadedFiles = this.$refs.files.files
        for (let i = 0; i < uploadedFiles.length; i++) {
          const reader = new FileReader()
          reader.onload = () => {
            this.sight.images.push({
              name: uploadedFiles[i].name,
              data: reader.result
            })
          }
          reader.readAsDataURL(uploadedFiles[i])
        }
      },
      addFacts () {
        this.$store.commit('ADD_FACTS')
      },
      removeFacts (index) {
        this.$store.commit('REMOVE_FACTS', {index: --index, num: 1})
      },
      removeFile (index) {
        this.$store.commit('REMOVE_FILE', {index, num: 1})
      }
    }
  }
</script>
