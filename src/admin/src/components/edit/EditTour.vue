<template>
  <div>
    <h1 class="my-3 text-xs-center teal--text">Редактировать тур:</h1>
    <v-layout justify-center>
      <v-flex xs12 sm10>
        <v-form enctype="multipart/form-data" ref="form" lazy-validation v-model="valid">
          <v-card class="mb-5">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-subheader class="title">Основная информация:</v-subheader>
                <template v-if="$route.params.tours === 'daily_tours' && tour.date">
                  <v-flex xs12>
                    <v-subheader class="subheading red--text">Дата:</v-subheader>
                    <v-dialog
                      ref="dialogDate"
                      v-model="dateModal"
                      :return-value.sync="tour.date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="tour.date"
                        label="Введите дату"
                        required
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="tour.date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="dateModal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogDate.save(tour.date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12>
                    <v-subheader class="subheading red--text">Повторяющиеся дни:</v-subheader>
                    <v-text-field
                      type="text"
                      v-model="tour.repeat.ru"
                      label="Введите повторяющиеся дни на русском"
                      :rules="rules"
                      required
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      v-model="tour.repeat.en"
                      label="Введите повторяющиеся дни на английском"
                      :rules="rules"
                      required
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      v-model="tour.repeat.arm"
                      label="Введите повторяющиеся дни на армянском"
                      :rules="rules"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-subheader class="subheading red--text">Начало экскурсии:</v-subheader>
                    <v-dialog
                      ref="dialogStart"
                      v-model="startModal"
                      :return-value.sync="tour.start"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="tour.start"
                        label="Введите начало экскурсии"
                        required
                        readonly
                      ></v-text-field>
                      <v-time-picker v-model="tour.start" actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="startModal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogStart.save(tour.start)">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12>
                    <v-subheader class="subheading red--text">Конец экскурсии:</v-subheader>
                    <v-dialog
                      ref="dialogEnd"
                      v-model="endModal"
                      :return-value.sync="tour.end"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="tour.end"
                        label="Введите конец экскурсии"
                        required
                        readonly
                      ></v-text-field>
                      <v-time-picker v-model="tour.end" actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="endModal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogEnd.save(tour.end)">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12>
                    <v-subheader class="subheading red--text">Тип тура:</v-subheader>
                    <v-text-field
                      type="text"
                      v-model="tour.typesOfDailyTour.ru"
                      label="Введите тип тура на русском"
                      :rules="rules"
                      required
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      v-model="tour.typesOfDailyTour.en"
                      label="Введите тип тура на английском"
                      :rules="rules"
                      required
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      v-model="tour.typesOfDailyTour.arm"
                      label="Введите тип тура на армянском"
                      :rules="rules"
                      required
                    ></v-text-field>
                  </v-flex>
                </template>
                <v-flex xs12 v-if="$route.params.tours === 'incoming_tours'">
                  <v-subheader class="subheading red--text">Тип тура:</v-subheader>
                  <v-autocomplete
                    :items="toursItem"
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
                  <v-flex xs12>
                    <v-text-field
                      type="text"
                      v-model="tour.daysAndNights.ru"
                      label="Введите количество дней и ночей на русском"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      type="text"
                      v-model="tour.daysAndNights.en"
                      label="Введите количество дней и ночей на английском"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      type="text"
                      v-model="tour.daysAndNights.arm"
                      label="Введите количество дней и ночей на армянском"
                    ></v-text-field>
                  </v-flex>
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
                <template v-if="$route.params.tours === 'incoming_tours' || $route.params.tours === 'daily_tours'">
                  <v-subheader class="title">Описание дня:</v-subheader>
                  <v-flex xs12 v-for="(array, index) in tour.arrayOfDays" :key="array.id">
                    <v-subheader class="subheading red--text">День({{++index}}):</v-subheader>
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
                    <v-btn class="error" @click="addDay">
                      Добавить день
                      <v-icon right dark>note_add</v-icon>
                    </v-btn>
                  </v-flex>
                </template>
                <v-subheader class="title">Дополнительная информация:</v-subheader>
                <v-flex xs12 v-for="(priceInclude, index) in tour.priceIncludes" :key="priceInclude.id">
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
                  <v-btn class="error" @click="addPriceIncludes">
                    Добавить поле (Стоимость включает)
                    <v-icon right dark>note_add</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs12 v-for="(priceExclude, index) in tour.priceExcludes" :key="priceExclude.id">
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
                  <v-btn class="error" @click="addPriceExcludes">
                    Добавить поле (Стоимость не включает)
                    <v-icon right dark>note_add</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs12 v-for="(pleaseNote, index) in tour.pleaseNotes" :key="pleaseNote.id">
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
                  <v-btn class="error" @click="addPleaseNotes">
                    Добавить поле (Важно)
                    <v-icon right dark>note_add</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <small class="red--text">*обязательные поля</small>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  @click="$router.back()"
                >Отмена
                </v-btn>
                <v-btn
                  color="success"
                  @click="editTour"
                  :loading="loading"
                  :disabled="!valid"
                >Изменить
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import {createHelpers} from 'vuex-map-fields'

  const {mapFields} = createHelpers({
    getterType: 'getToursField',
    mutationType: 'updateToursField'
  })

  export default {
    computed: {
      ...mapFields([
        'valid',
        'dateModal',
        'startModal',
        'endModal',
        'toursItem',
        'tour',
        'titleRules',
        'descriptionRules',
        'rules'
      ]),
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      async getTour () {
        await this.$store.dispatch('getTour', {
          lang: this.$route.params.lang,
          tours: this.$route.params.tours,
          id: this.$route.params.id
        })
          .then(() => {
          })
          .catch(() => {
          })
      },
      async editTour () {
        if (this.$refs.form.validate()) {
          await this.$store.dispatch('editTour', {
            tours: this.$route.params.tours,
            id: this.$route.params.id,
            tour: this.tour
          })
            .then(() => {
            })
            .catch(() => {
            })
        }
      },
      addDay () {
        this.$store.commit('ADD_DAY')
      },
      addPriceIncludes () {
        this.$store.commit('ADD_PRICE_INCLUDES')
      },
      addPriceExcludes () {
        this.$store.commit('ADD_PRICE_EXCLUDES')
      },
      addPleaseNotes () {
        this.$store.commit('ADD_PLEASE_NOTES')
      },
      removeDay (index) {
        this.$store.commit('REMOVE_DAY', {index: --index, num: 1})
      },
      removePriceIncludes (index) {
        this.$store.commit('REMOVE_PRICE_INCLUDES', {index: --index, num: 1})
      },
      removePriceExcludes (index) {
        this.$store.commit('REMOVE_PRICE_EXCLUDES', {index: --index, num: 1})
      },
      removePleaseNotes (index) {
        this.$store.commit('REMOVE_PLEASE_NOTES', {index: --index, num: 1})
      }
    },
    mounted () {
      this.getTour()
    }
  }
</script>
