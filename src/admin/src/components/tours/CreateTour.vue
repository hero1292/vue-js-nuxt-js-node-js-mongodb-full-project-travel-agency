<template>
  <div>
    <h1 class="my-3 text-xs-center green--text">Создать тур:</h1>
    <v-form enctype="multipart/form-data" ref="form" lazy-validation v-model="valid">
      <v-card>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-subheader class="title">Основная информация:</v-subheader>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Тип тура:</v-subheader>
              <v-autocomplete
                :items="tours"
                v-model="tour.typesOfTour"
                label="Выберите тип тура"
                item-text="name"
                item-value="name"
                multiple
                chips
                max-height="auto"
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    :selected="data.selected"
                    :key="JSON.stringify(data.item)"
                    close
                    class="chip--select-multi"
                    @input="data.parent.selectItem(data.item)"
                  >
                    {{ data.item.name }}
                  </v-chip>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Название тура:</v-subheader>
              <v-text-field
                type="text"
                v-model="tour.title.ru"
                label="Введите название тура на русском"
                :counter="5"
                :rules="titleRules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="tour.title.en"
                label="Введите название тура на английском"
                :counter="5"
                :rules="titleRules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="tour.title.arm"
                label="Введите название тура на армянском"
                :counter="5"
                :rules="titleRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Название страны:</v-subheader>
              <v-text-field
                type="text"
                v-model="tour.country.ru"
                label="Введите название страны на русском"
                :rules="rules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="tour.country.en"
                label="Введите название страны на английском"
                :rules="rules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="tour.country.arm"
                label="Введите название страны на армянском"
                :rules="rules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Количество дней:</v-subheader>
              <v-text-field
                type="number"
                v-model="tour.days"
                label="Введите количество дней"
                :rules="rules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Количество ночей:</v-subheader>
              <v-text-field
                type="number"
                v-model="tour.nights"
                label="Введите количество ночей"
                :rules="rules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Цена тура:</v-subheader>
              <v-flex xs12>
                <v-text-field
                  type="text"
                  label="Введите цену в драмах"
                  :rules="rules"
                  required
                  v-model="tour.prices.amd"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  type="text"
                  label="Введите цену в рублях"
                  :rules="rules"
                  required
                  v-model="tour.prices.rur"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  type="text"
                  label="Введите цену в долларах"
                  :rules="rules"
                  required
                  v-model="tour.prices.usd"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  type="text"
                  label="Введите цену в евро"
                  :rules="rules"
                  required
                  v-model="tour.prices.eur"
                ></v-text-field>
              </v-flex>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Описание тура:</v-subheader>
              <v-textarea
                type="text"
                v-model="tour.description.ru"
                label="Введите краткое описание тура на русском"
                :counter="10"
                :rules="descriptionRules"
                required
              ></v-textarea>
              <v-textarea
                type="text"
                v-model="tour.description.en"
                label="Введите краткое описание тура на английском"
                :counter="10"
                :rules="descriptionRules"
                required
              ></v-textarea>
              <v-textarea
                type="text"
                v-model="tour.description.arm"
                label="Введите краткое описание тура на армянском"
                :counter="10"
                :rules="descriptionRules"
                required
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Количество человек:</v-subheader>
              <v-text-field
                type="number"
                v-model="tour.groupSize"
                label="Введите количество человек в группе"
                :rules="rules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Тип размещения:</v-subheader>
              <v-text-field
                type="text"
                v-model="tour.accommodation.ru"
                label="Введите тип размещения на русском"
                :rules="rules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="tour.accommodation.en"
                label="Введите тип размещения на английском"
                :rules="rules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="tour.accommodation.arm"
                label="Введите тип размещения на армянском"
                :rules="rules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Лучший период:</v-subheader>
              <v-text-field
                type="text"
                v-model="tour.bestPeriod.ru"
                label="Введите лучший период на русском"
                :rules="rules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="tour.bestPeriod.en"
                label="Введите лучший период на английском"
                :rules="rules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="tour.bestPeriod.arm"
                label="Введите лучший период на армянском"
                :rules="rules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Начальная и конечная точка:</v-subheader>
              <v-text-field
                type="text"
                v-model="tour.startEndPoint.ru"
                label="Введите начальную и конечную точку на русском"
                :rules="rules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="tour.startEndPoint.en"
                label="Введите начальную и конечную точку на английском"
                :rules="rules"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="tour.startEndPoint.arm"
                label="Введите начальную и конечную точку на армянском"
                :rules="rules"
                required
              ></v-text-field>
            </v-flex>
            <v-subheader class="title">Описание дня:</v-subheader>
            <v-flex xs12 v-for="(array, index) in tour.arrayOfDays" :key="array.id">
              <v-card>
                <v-card-actions>
                  <v-btn
                    color="pink"
                    dark
                    absolute
                    small
                    bottom
                    right
                    fab
                    @click="removeDay(index)"
                  >
                    <v-icon>remove</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-flex xs12>
                  <v-subheader class="subheading red--text">Направление дня:</v-subheader>
                  <v-textarea
                    type="text"
                    label="Введите направление дня на русском"
                    :rules="rules"
                    required
                    v-model="array.way.ru"
                  ></v-textarea>
                  <v-textarea
                    type="text"
                    label="Введите направление дня на английском"
                    :rules="rules"
                    required
                    v-model="array.way.en"
                  ></v-textarea>
                  <v-textarea
                    type="text"
                    label="Введите направление дня на армянском"
                    :rules="rules"
                    required
                    v-model="array.way.arm"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-subheader class="subheading red--text">Описание дня:</v-subheader>
                  <v-textarea
                    type="text"
                    label="Введите описание дня на русском"
                    :rules="rules"
                    required
                    v-model="array.text.ru"
                  ></v-textarea>
                  <v-textarea
                    type="text"
                    label="Введите описание дня на английском"
                    :rules="rules"
                    required
                    v-model="array.text.en"
                  ></v-textarea>
                  <v-textarea
                    type="text"
                    label="Введите описание дня на армянском"
                    :rules="rules"
                    required
                    v-model="array.text.arm"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-subheader class="subheading red--text">Место ночлега:</v-subheader>
                  <v-text-field
                    type="text"
                    label="Введите место ночлега на русском"
                    :rules="rules"
                    required
                    v-model="array.overnight.ru"
                  ></v-text-field>
                  <v-text-field
                    type="text"
                    label="Введите место ночлега на английском"
                    :rules="rules"
                    required
                    v-model="array.overnight.en"
                  ></v-text-field>
                  <v-text-field
                    type="text"
                    label="Введите место ночлега армянском"
                    :rules="rules"
                    required
                    v-model="array.overnight.arm"
                  ></v-text-field>
                </v-flex>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-btn class="error" @click="addDayOfTour">
                Добавить день
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
                        v-for="(file, key) in files" :key="key"
                >
                  <v-card>
                    <img :ref="'image' + parseInt(key)" height="200" width="100%">
                    <v-card-title primary-title>
                      <div>
                        <span class="headline mb-0">{{file.name}}</span>
                      </div>
                    </v-card-title>
                    <v-btn
                      color="pink"
                      dark
                      small
                      bottom
                      left
                      fab
                      @click="removeFile(key)"
                    >
                      <v-icon>remove</v-icon>
                    </v-btn>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
            <v-subheader class="title">Дополнительная информация:</v-subheader>
            <v-flex xs12 v-for="(priceInclude, index) in tour.priceIncludes" :key="priceInclude.id">
              <v-card>
                <v-card-actions>
                  <v-btn
                    color="pink"
                    dark
                    absolute
                    small
                    bottom
                    right
                    fab
                    @click="removePriceIncludes(index)"
                  >
                    <v-icon>remove</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-subheader class="subheading red--text">Стоимость включает({{++index}}):</v-subheader>
                <v-text-field
                  type="text"
                  label="Стоимость включает на русском"
                  :rules="rules"
                  v-model="priceInclude.valueOfInc.ru"
                ></v-text-field>
                <v-text-field
                  type="text"
                  label="Стоимость включает на английском"
                  :rules="rules"
                  v-model="priceInclude.valueOfInc.en"
                ></v-text-field>
                <v-text-field
                  type="text"
                  label="Стоимость включает на армянском"
                  :rules="rules"
                  v-model="priceInclude.valueOfInc.arm"
                ></v-text-field>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-btn class="error" @click="addPriceIncludesOfTour">
                Добавить поле (Стоимость включает)
                <v-icon right dark>note_add</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs12 v-for="(priceExclude, index) in tour.priceExcludes" :key="priceExclude.id">
              <v-card>
                <v-card-actions>
                  <v-btn
                    color="pink"
                    dark
                    absolute
                    small
                    bottom
                    right
                    fab
                    @click="removePriceExcludes(index)"
                  >
                    <v-icon>remove</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-subheader class="subheading red--text">Стоимость не включает({{++index}}):</v-subheader>
                <v-text-field
                  type="text"
                  label="Стоимость не включает на русском"
                  :rules="rules"
                  v-model="priceExclude.valueOfExc.ru"
                ></v-text-field>
                <v-text-field
                  type="text"
                  label="Стоимость не включает на английском"
                  :rules="rules"
                  v-model="priceExclude.valueOfExc.en"
                ></v-text-field>
                <v-text-field
                  type="text"
                  label="Стоимость не включает на армянском"
                  :rules="rules"
                  v-model="priceExclude.valueOfExc.arm"
                ></v-text-field>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-btn class="error" @click="addPriceExcludesOfTour">
                Добавить поле (Стоимость не включает)
                <v-icon right dark>note_add</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs12 v-for="(pleaseNote, index) in tour.pleaseNotes" :key="pleaseNote.id">
              <v-card>
                <v-card-actions>
                  <v-btn
                    color="pink"
                    dark
                    absolute
                    small
                    bottom
                    right
                    fab
                    @click="removePleaseNotes(index)"
                  >
                    <v-icon>remove</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-subheader class="subheading red--text">Важно({{++index}}):</v-subheader>
                <v-text-field
                  type="text"
                  label="Важно на русском"
                  :rules="rules"
                  v-model="pleaseNote.valueOfNote.ru"
                ></v-text-field>
                <v-text-field
                  type="text"
                  label="Важно на английском"
                  :rules="rules"
                  v-model="pleaseNote.valueOfNote.en"
                ></v-text-field>
                <v-text-field
                  type="text"
                  label="Важно на армянском"
                  :rules="rules"
                  v-model="pleaseNote.valueOfNote.arm"
                ></v-text-field>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-btn class="error" @click="addPleaseNotesOfTour">
                Добавить поле (Важно)
                <v-icon right dark>note_add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <small class="red--text">*обязательные поля</small>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              @click="send"
              :loading="loading"
              :disabled="!valid || !files"
            >Опубликовать
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-form>
  </div>
</template>

<script>
  import api from '../../plugins/api'

  export default {
    data () {
      return {
        valid: false,
        tours: [
          {name: 'Classic'},
          {name: 'Adventure'},
          {name: 'Regional'},
          {name: 'Special'},
          {name: 'Winter'},
          {name: 'Budget'}
        ],
        tour: {
          typesOfTour: [],
          title: { ru: '', en: '', arm: '' },
          country: { ru: '', en: '', arm: '' },
          days: '',
          nights: '',
          prices: {amd: '', rur: '', usd: '', eur: ''},
          description: { ru: '', en: '', arm: '' },
          groupSize: '',
          accommodation: { ru: '', en: '', arm: '' },
          bestPeriod: { ru: '', en: '', arm: '' },
          startEndPoint: { ru: '', en: '', arm: '' },
          arrayOfDays: [{
            way: { ru: '', en: '', arm: '' },
            text: { ru: '', en: '', arm: '' },
            overnight: { ru: '', en: '', arm: '' }
          }],
          priceIncludes: [],
          priceExcludes: [],
          pleaseNotes: []
        },
        files: [],
        titleRules: [
          v => !!v || 'Заполните поле',
          v => v.length > 5 || 'Заголовок должен быть больше 5-и символов'
        ],
        descriptionRules: [
          v => !!v || 'Заполните поле',
          v => v.length > 10 || 'Краткое описание должно быть больше 10-и символов'
        ],
        rules: [
          v => !!v || 'Заполните поле'
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
          this.$store.dispatch('clearSuccess')
          this.$store.dispatch('clearError')
          this.$store.dispatch('setLoading', true)
          await api.post('/tours', this.tour)
            .then(() => {
              this.$store.dispatch('setLoading', false)
              this.$store.dispatch('setSuccess', 'Тур успешно добавлен!')
            })
            .catch((err) => {
              this.$store.dispatch('setLoading', false)
              this.$store.dispatch('setError', 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!')
              throw err
            })
        }
      },
      triggerUpload () {
        this.$refs.files.click()
      },
      onFileChange () {
        let uploadedFiles = this.$refs.files.files
        for (let i = 0; i < uploadedFiles.length; i++) {
          this.files.push(uploadedFiles[i])
        }
        for (let i = 0; i < uploadedFiles.length; i++) {
          const reader = new FileReader()
          reader.onload = e => {
            this.$refs['image' + parseInt(i)][0].src = reader.result
          }
          reader.readAsDataURL(uploadedFiles[i])
        }
      },
      addDayOfTour () {
        this.tour.arrayOfDays.push(
          {
            way: { ru: '', en: '', arm: '' },
            text: { ru: '', en: '', arm: '' },
            overnight: { ru: '', en: '', arm: '' }
          })
      },
      addPriceIncludesOfTour () {
        this.tour.priceIncludes.push({valueOfInc: { ru: '', en: '', arm: '' }})
      },
      addPriceExcludesOfTour () {
        this.tour.priceExcludes.push({valueOfExc: { ru: '', en: '', arm: '' }})
      },
      addPleaseNotesOfTour () {
        this.tour.pleaseNotes.push({valueOfNote: { ru: '', en: '', arm: '' }})
      },
      removeFile (key) {
        this.files.splice(key, 1)
      },
      removeDay (index) {
        this.tour.arrayOfDays.splice(index, 1)
      },
      removePriceIncludes (index) {
        this.tour.priceIncludes.splice(--index, 1)
      },
      removePriceExcludes (index) {
        this.tour.priceExcludes.splice(--index, 1)
      },
      removePleaseNotes (index) {
        this.tour.pleaseNotes.splice(--index, 1)
      }
    }
  }
</script>
