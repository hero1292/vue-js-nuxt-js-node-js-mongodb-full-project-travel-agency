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
                    color="pink"
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
                        color="pink"
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
                        color="pink"
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
                    color="pink"
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
                        v-for="(image, key) in hotel.images" :key="key"
                >
                  <v-card>
                    <img :ref="'image' + parseInt(key)" height="200" width="100%">
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
                      @click="removeFile(key)"
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
              :disabled="!valid || !hotel.images"
            >Опубликовать
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-form>
  </div>
</template>

<script>
  import api from '../../services/api'

  export default {
    data () {
      return {
        valid: false,
        arrivalModal: false,
        departureModal: false,
        resorts: [
          {name: 'Tsaghkadzor'},
          {name: 'Aghveran'},
          {name: 'Hankavan'},
          {name: 'Ahavnadzor'},
          {name: 'Dilijan'},
          {name: 'Sevan'},
          {name: 'Stepanavan'},
          {name: 'Vanadzor'},
          {name: 'Djermuk'},
          {name: 'Byurakan'},
          {name: 'Idjevan'},
          {name: 'Yeghegnadzor_Vayk'},
          {name: 'Artsakh'},
          {name: 'Haghpat'},
          {name: 'Syunik'},
          {name: 'Gyumri'}
        ],
        values: [
          {name: 'room'},
          {name: 'price1'},
          {name: 'price2'},
          {name: 'price3'},
          {name: 'price4'},
          {name: 'price5'},
          {name: 'price6'},
          {name: 'price7'},
          {name: 'price8'},
          {name: 'price9'},
          {name: 'price10'}
        ],
        hotel: {
          resort: '',
          title: '',
          tables: [{
            headers: [{}],
            prices: [{}]
          }],
          description: '',
          arrival: null,
          departure: null,
          socPackages: [{}],
          images: []
        },
        titleRules: [
          v => v.length > 5 || 'Заголовок должен быть больше 5-и символов'
        ],
        descriptionRules: [
          v => v.length > 10 || 'Описание должно быть больше 10-и символов'
        ],
        socPackagesRules: [
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
          await api.post('/soc_packages', this.hotel)
            .then(() => {
              this.$store.dispatch('setLoading', false)
              this.$store.dispatch('setSuccess', 'Отель успешно добавлен!')
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
          this.hotel.images.push(uploadedFiles[i])
        }
        for (let i = 0; i < uploadedFiles.length; i++) {
          const reader = new FileReader()
          reader.onload = e => {
            this.$refs['image' + parseInt(i)][0].src = reader.result
          }
          reader.readAsDataURL(uploadedFiles[i])
        }
      },
      addTable () {
        this.hotel.tables.push({
          headers: [{}],
          prices: [{}]
        })
      },
      addHeader () {
        this.hotel.tables.forEach(table => {
          table.headers.push({
            title: '',
            value: ''
          })
        })
      },
      addPrice () {
        this.hotel.tables.forEach(table => {
          table.prices.push({
            room: '',
            price1: '',
            price2: '',
            price3: '',
            price4: '',
            price5: '',
            price6: '',
            price7: '',
            price8: '',
            price9: '',
            price10: ''
          })
        })
      },
      removeTable (index) {
        this.hotel.tables.splice(--index, 1)
      },
      removeHeader (index) {
        this.hotel.tables.forEach(table => {
          table.headers.splice(--index, 1)
        })
      },
      removePrice (index) {
        this.hotel.tables.forEach(table => {
          table.prices.splice(--index, 1)
        })
      },
      addSocPackage () {
        this.hotel.socPackages.push({package: ''})
      },
      removeSocPackage (index) {
        this.hotel.socPackages.splice(index, 1)
      }
    }
  }
</script>
