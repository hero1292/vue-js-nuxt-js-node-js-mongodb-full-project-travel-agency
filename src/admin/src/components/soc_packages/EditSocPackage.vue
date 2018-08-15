<template>
  <div>
    <h1 class="my-3 text-xs-center green--text">Создать отель:</h1>
    <v-form enctype="multipart/form-data" ref="form" lazy-validation v-model="valid">
      <v-card class="mb-5">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-subheader class="title">Основная информация:</v-subheader>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Курорт:</v-subheader>
              <v-autocomplete
                :items="resorts"
                v-model="hotel.resort"
                label="Выберите курорт"
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
              <v-subheader class="subheading red--text">Название гостиницы:</v-subheader>
              <v-text-field
                type="text"
                v-model="hotel.title"
                label="Введите название гостиницы"
                :counter="5"
                :rules="titleRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 v-for="(table, index) in hotel.tables" :key="table.id">
              <v-subheader class="title red--text">Таблица({{++index}}):</v-subheader>
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
                    @click="removeTable(index)"
                  >
                    <v-icon>remove</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-flex xs12 v-for="(header, index) in table.headers" :key="header.id">
                  <v-subheader class="subheading red--text">Заголовок({{++index}}):</v-subheader>
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
                        @click="removeHeader(index)"
                      >
                        <v-icon>remove</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите название заголовка"
                        v-model="header.title"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-autocomplete
                        :items="values"
                        v-model="header.value"
                        label="Выберите тип заголовка"
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
                  </v-card>
                </v-flex>
                <v-flex xs12>
                  <v-btn class="error" @click="addHeader">
                    Добавить заголовок
                    <v-icon right dark>note_add</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs12 v-for="(price, index) in table.prices" :key="price.id">
                  <v-subheader class="subheading red--text">Комната({{++index}}):</v-subheader>
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
                        @click="removePrice(index)"
                      >
                        <v-icon>remove</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите тип комнаты"
                        v-model="price.room"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите Цена 1"
                        v-model="price.price1"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите Цена 2"
                        v-model="price.price2"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите Цена 3"
                        v-model="price.price3"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите Цена 4"
                        v-model="price.price4"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите Цена 5"
                        v-model="price.price5"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите Цена 6"
                        v-model="price.price6"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите Цена 7"
                        v-model="price.price7"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите Цена 8"
                        v-model="price.price8"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите Цена 9"
                        v-model="price.price9"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        type="text"
                        label="Введите Цена 10"
                        v-model="price.price10"
                      ></v-text-field>
                    </v-flex>
                  </v-card>
                </v-flex>
                <v-flex xs12>
                  <v-btn class="error" @click="addPrice">
                    Добавить комнату
                    <v-icon right dark>note_add</v-icon>
                  </v-btn>
                </v-flex>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-btn class="error" @click="addTable">
                Добавить таблицу
                <v-icon right dark>note_add</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Описание гостиницы:</v-subheader>
              <v-textarea
                type="text"
                v-model="hotel.description"
                label="Введите описание гостиницы"
                :counter="10"
                :rules="descriptionRules"
                required
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Время прибытия:</v-subheader>
              <v-dialog
                ref="dialogArrival"
                v-model="arrivalModal"
                :return-value.sync="hotel.arrival"
                persistent
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="hotel.arrival"
                  label="Введите время прибытия"
                  required
                  readonly
                ></v-text-field>
                <v-time-picker v-model="hotel.arrival" actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="arrivalModal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialogArrival.save(hotel.arrival)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="subheading red--text">Время отъезда:</v-subheader>
              <v-dialog
                ref="dialogDeparture"
                v-model="departureModal"
                :return-value.sync="hotel.departure"
                persistent
                lazy
                full-width
                width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="hotel.departure"
                  label="Введите время отъезда"
                  required
                  readonly
                ></v-text-field>
                <v-time-picker v-model="hotel.departure" actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="departureModal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialogDeparture.save(hotel.departure)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs12 v-for="(socPackage, index) in hotel.socPackages" :key="socPackage.id">
              <v-subheader class="subheading red--text">Описание соц. пакета:</v-subheader>
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
                    @click="removeSocPackage(index)"
                  >
                    <v-icon>remove</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-textarea
                  type="text"
                  label="Опишите соц. пакет"
                  :rules="socPackagesRules"
                  v-model="socPackage.package"
                ></v-textarea>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-btn class="error" @click="addSocPackage">
                Добавить соц. пакет
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
              @click="editHotel"
              :loading="loading"
              :disabled="!valid"
            >Изменить
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
    getterType: 'getSocField',
    mutationType: 'updateSocField'
  })

  export default {
    computed: {
      ...mapFields([
        'valid',
        'arrivalModal',
        'departureModal',
        'resorts',
        'values',
        'hotel',
        'titleRules',
        'descriptionRules',
        'socPackagesRules'
      ]),
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
      getHotel () {
        this.$store.dispatch('getHotel')
          .then(() => {})
          .catch(() => {})
      },
      editHotel () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('editHotel')
            .then(() => {
            })
            .catch(() => {
            })
        }
      },
      addTable () {
        this.$store.commit('ADD_TABLE')
      },
      addHeader () {
        this.$store.commit('ADD_HEADER')
      },
      addPrice () {
        this.$store.commit('ADD_PRICE')
      },
      addSocPackage () {
        this.$store.commit('ADD_SOC_PACKAGE')
      },
      removeTable (index) {
        this.$store.commit('REMOVE_TABLE', {index: --index, num: 1})
      },
      removeHeader (index) {
        this.$store.commit('REMOVE_HEADER', {index: --index, num: 1})
      },
      removePrice (index) {
        this.$store.commit('REMOVE_PRICE', {index: --index, num: 1})
      },
      removeSocPackage (index) {
        this.$store.commit('REMOVE_SOC_PACKAGE', {index: index, num: 1})
      }
    },
    mounted () {
      this.getHotel()
    }
  }
</script>
