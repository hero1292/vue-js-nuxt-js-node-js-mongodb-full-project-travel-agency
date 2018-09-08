<template>
    <v-container class="text-xs-center">
        <h1 class="my-3 text-xs-center teal--text">{{$t('tours.privateTours.title')}}:</h1>
        <p class="subheading mb-3 text-xs-center red--text">{{$t('tours.privateTours.description')}}</p>
        <v-divider></v-divider>
        <v-flex xs12>
            <v-radio-group v-model="currency" row>
                <v-radio color="teal" label="AMD" value="amd"></v-radio>
                <v-radio color="teal" label="RUR" value="rur"></v-radio>
                <v-radio color="teal" label="USD" value="usd"></v-radio>
                <v-radio color="teal" label="EUR" value="eur"></v-radio>
            </v-radio-group>
        </v-flex>
        <v-data-table
                :headers="headers"
                :items="tours"
                hide-actions
                disable-initial-sort
                class="elevation-2 mb-3"
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{props.item.name}}</td>
                <td v-if="currency === 'amd'" class="text-xs-center">{{props.item.price1[0]}}</td>
                <td v-if="currency === 'rur'" class="text-xs-center">{{props.item.price1[1]}}</td>
                <td v-if="currency === 'usd'" class="text-xs-center">{{props.item.price1[2]}}</td>
                <td v-if="currency === 'eur'" class="text-xs-center">{{props.item.price1[3]}}</td>

                <td v-if="currency === 'amd'" class="text-xs-center">{{props.item.price2[0]}}</td>
                <td v-if="currency === 'rur'" class="text-xs-center">{{props.item.price2[1]}}</td>
                <td v-if="currency === 'usd'" class="text-xs-center">{{props.item.price2[2]}}</td>
                <td v-if="currency === 'eur'" class="text-xs-center">{{props.item.price2[3]}}</td>

                <td v-if="currency === 'amd'" class="text-xs-center">{{props.item.price3[0]}}</td>
                <td v-if="currency === 'rur'" class="text-xs-center">{{props.item.price3[1]}}</td>
                <td v-if="currency === 'usd'" class="text-xs-center">{{props.item.price3[2]}}</td>
                <td v-if="currency === 'eur'" class="text-xs-center">{{props.item.price3[3]}}</td>

                <td v-if="currency === 'amd'" class="text-xs-center">{{props.item.price4[0]}}</td>
                <td v-if="currency === 'rur'" class="text-xs-center">{{props.item.price4[1]}}</td>
                <td v-if="currency === 'usd'" class="text-xs-center">{{props.item.price4[2]}}</td>
                <td v-if="currency === 'eur'" class="text-xs-center">{{props.item.price4[3]}}</td>

                <td v-if="currency === 'amd'" class="text-xs-center">{{props.item.price5[0]}}</td>
                <td v-if="currency === 'rur'" class="text-xs-center">{{props.item.price5[1]}}</td>
                <td v-if="currency === 'usd'" class="text-xs-center">{{props.item.price5[2]}}</td>
                <td v-if="currency === 'eur'" class="text-xs-center">{{props.item.price5[3]}}</td>

                <td v-if="currency === 'amd'" class="text-xs-center">{{props.item.price6[0]}}</td>
                <td v-if="currency === 'rur'" class="text-xs-center">{{props.item.price6[1]}}</td>
                <td v-if="currency === 'usd'" class="text-xs-center">{{props.item.price6[2]}}</td>
                <td v-if="currency === 'eur'" class="text-xs-center">{{props.item.price6[3]}}</td>

                <td class="text-xs-center">{{props.item.km}}</td>
                <td class="text-xs-center">{{props.item.hr}}</td>
            </template>
        </v-data-table>
        <v-divider></v-divider>
        <p class="subheading mt-2 text-xs-center teal--text">{{$t('tours.privateTours.transfer.title')}}</p>
        <p class="text-xs-center red--text">
            {{$t('tours.privateTours.transfer.pax1')}} - 6000 AMD, 780 RUR, 12 USD
            <br>{{$t('tours.privateTours.transfer.pax2')}} - 10.000 AMD, 1.300 RUR, 21 USD
            <br>{{$t('tours.privateTours.transfer.pax3')}} - 25.000 AMD, 3.251 RUR, 52 USD
            <br>{{$t('tours.privateTours.headers.km')}} - 11
        </p>
        <p class="subheading mt-2 text-xs-center teal--text">* {{$t('tours.privateTours.entranceFees')}}</p>
        <p class="text-xs-center red--text">{{$t('tours.privateTours.entranceFeesText')}}</p>
        <p class="subheading mt-2 text-xs-center teal--text">** {{$t('tours.privateTours.artsakhVisa')}}</p>
        <p class="subheading mt-2 text-xs-center teal--text">*** {{$t('tours.privateTours.pricesInclude')}}</p>
        <p class="text-xs-center red--text">{{$t('tours.privateTours.pricesIncludeText')}}</p>
        <p class="subheading mt-2 text-xs-center teal--text">**** {{$t('tours.privateTours.dayOff')}}</p>
        <p class="text-xs-center red--text">{{$t('tours.privateTours.dayOffText')}}</p>
        <app-contact-form class="my-3"></app-contact-form>
    </v-container>
</template>

<script>
  import ContactForm from '../../../components/ContactForm.vue'

  export default {
    data () {
      return {
        currency: 'amd'
      }
    },
    computed: {
      headers () {
        return [
          {
            text: this.$t('tours.privateTours.headers.destination'),
            align: 'left',
            value: 'name'
          },
          {text: this.$t('tours.privateTours.headers.price1'), value: 'price1'},
          {text: this.$t('tours.privateTours.headers.price2'), value: 'price2'},
          {text: this.$t('tours.privateTours.headers.price3'), value: 'price3'},
          {text: this.$t('tours.privateTours.headers.price4'), value: 'price4'},
          {text: this.$t('tours.privateTours.headers.price5'), value: 'price5'},
          {text: this.$t('tours.privateTours.headers.price6'), value: 'price6'},
          {text: this.$t('tours.privateTours.headers.km'), value: 'km'},
          {text: this.$t('tours.privateTours.headers.hr'), value: 'hr'}
        ]
      },
      tours () {
        return [
          {
            value: false,
            name: this.$t('tours.privateTours.tours.0'),
            price1: ['17.000', '2.211', '35', '30'],
            price2: ['22.000', '2.861', '46', '39'],
            price3: ['27.000', '3.511', '56', '48'],
            price4: ['37.000', '4.811', '77', '66'],
            price5: ['42.000', '5.462', '87', '75'],
            price6: ['47.000', '6.112', '98', '83'],
            km: '30',
            hr: '3-4'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.1'),
            price1: ['20.000', '2.601', '42', '35'],
            price2: ['23.000', '2.991', '48', '41'],
            price3: ['33.000', '4.291', '69', '59'],
            price4: ['35.000', '4.551', '73', '62'],
            price5: ['38.000', '4.941', '79', '67'],
            price6: ['48.000', '6.242', '100', '85'],
            km: '60',
            hr: '4-5'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.2'),
            price1: ['22.000', '2.861', '46', '39'],
            price2: ['27.000', '3.511', '56', '48'],
            price3: ['35.000', '4.551', '73', '62'],
            price4: ['37.000', '4.811', '77', '66'],
            price5: ['42.000', '5.462', '87', '75'],
            price6: ['50.000', '6.502', '104', '89'],
            km: '75',
            hr: '4-5'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.3'),
            price1: ['18.000', '2.341', '37', '32'],
            price2: ['23.000', '2.991', '48', '41'],
            price3: ['33.000', '4.291', '69', '59'],
            price4: ['18.000', '2.341', '37', '32'],
            price5: ['23.000', '2.991', '48', '41'],
            price6: ['33.000', '4.291', '69', '59'],
            km: '80',
            hr: '3-4'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.4'),
            price1: ['23.000', '2.991', '48', '41'],
            price2: ['29.000', '3.771', '60', '51'],
            price3: ['35.000', '4.551', '73', '62'],
            price4: ['38.000', '4.941', '79', '67'],
            price5: ['44.000', '5.722', '92', '78'],
            price6: ['50.000', '6.502', '104', '89'],
            km: '90',
            hr: '4-5'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.5'),
            price1: ['18.000', '2.341', '37', '32'],
            price2: ['23.000', '2.991', '48', '41'],
            price3: ['35.000', '4.551', '73', '62'],
            price4: ['33.000', '4.291', '69', '59'],
            price5: ['38.000', '4.941', '79', '67'],
            price6: ['50.000', '6.502', '104', '89'],
            km: '95',
            hr: '3-4'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.6'),
            price1: ['16.000', '2.081', '33', '28'],
            price2: ['22.000', '2.861', '46', '39'],
            price3: ['35.000', '4.551', '73', '62'],
            price4: ['31.000', '4.031', '65', '55'],
            price5: ['37.000', '4.811', '77', '66'],
            price6: ['50.000', '6.502', '104', '89'],
            km: '100',
            hr: '4-5'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.7'),
            price1: ['27.000', '3.511', '56', '48'],
            price2: ['32.000', '4.161', '67', '57'],
            price3: ['47.000', '6.112', '98', '83'],
            price4: ['45.000', '5.852', '94', '80'],
            price5: ['50.000', '6.502', '104', '89'],
            price6: ['65.000', '8.453', '135', '115'],
            km: '120',
            hr: '5-6'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.8'),
            price1: ['18.000', '2.341', '37', '32'],
            price2: ['24.000', '3.121', '50', '43'],
            price3: ['35.000', '4.551', '73', '62'],
            price4: ['33.000', '4.291', '69', '59'],
            price5: ['39.000', '5.072', '81', '69'],
            price6: ['50.000', '6.502', '104', '89'],
            km: '130',
            hr: '4-5'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.9'),
            price1: ['30.000', '3.901', '62', '53'],
            price2: ['39.000', '5.072', '81', '69'],
            price3: ['55.000', '7.152', '114', '98'],
            price4: ['55.000', '7.152', '114', '98'],
            price5: ['64.000', '8.322', '133', '114'],
            price6: ['80.000', '10.403', '167', '142'],
            km: '130',
            hr: '8-9'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.10'),
            price1: ['28.000', '3.641', '58', '50'],
            price2: ['34.000', '4.421', '71', '60'],
            price3: ['49.000', '6.372', '102', '87'],
            price4: ['43.000', '5.592', '90', '76'],
            price5: ['49.000', '6.372', '102', '87'],
            price6: ['64.000', '8.322', '133', '114'],
            km: '150',
            hr: '6-7'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.11'),
            price1: ['25.000', '3.251', '52', '44'],
            price2: ['30.000', '3.901', '62', '53'],
            price3: ['38.000', '4.941', '79', '67'],
            price4: ['40.000', '5.202', '83', '71'],
            price5: ['45.000', '5.852', '94', '80'],
            price6: ['53.000', '6.892', '110', '94'],
            km: '150',
            hr: '5-6'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.12'),
            price1: ['29.000', '3.771', '60', '51'],
            price2: ['40.000', '5.202', '83', '71'],
            price3: ['52.000', '6.762', '108', '92'],
            price4: ['47.000', '6.112', '98', '83'],
            price5: ['58.000', '7.542', '121', '103'],
            price6: ['70.000', '9.103', '146', '124'],
            km: '150',
            hr: '6-7'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.13'),
            price1: ['33.000', '4.291', '69', '59'],
            price2: ['41.000', '5.332', '85', '73'],
            price3: ['56.000', '7.282', '117', '99'],
            price4: ['51.000', '6.632', '106', '91'],
            price5: ['59.000', '7.672', '123', '105'],
            price6: ['74.000', '9.623', '154', '131'],
            km: '150',
            hr: '6-7'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.14'),
            price1: ['32.000', '4.161', '67', '57'],
            price2: ['41.000', '5.332', '85', '73'],
            price3: ['54.000', '7.022', '112', '96'],
            price4: ['50.000', '6.502', '104', '89'],
            price5: ['59.000', '7.672', '123', '105'],
            price6: ['72.000', '9.363', '150', '128'],
            km: '170',
            hr: '6-7'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.15'),
            price1: ['30.000', '3.901', '62', '53'],
            price2: ['36.000', '4.681', '75', '64'],
            price3: ['49.000', '6.372', '102', '87'],
            price4: ['45.000', '5.852', '94', '80'],
            price5: ['51.000', '6.632', '106', '91'],
            price6: ['64.000', '8.322', '133', '114'],
            km: '170',
            hr: '6-7'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.16'),
            price1: ['37.000', '4.811', '77', '66'],
            price2: ['43.000', '5.592', '90', '76'],
            price3: ['56.000', '7.282', '117', '99'],
            price4: ['55.000', '7.152', '114', '98'],
            price5: ['61.000', '7.932', '127', '108'],
            price6: ['74.000', '9.623', '154', '131'],
            km: '220',
            hr: '6-7'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.17'),
            price1: ['30.000', '3.901', '62', '53'],
            price2: ['42.000', '5.462', '87', '75'],
            price3: ['51.000', '6.632', '106', '91'],
            price4: ['48.000', '6.242', '100', '85'],
            price5: ['60.000', '7.802', '125', '106'],
            price6: ['69.000', '8.973', '144', '122'],
            km: '230',
            hr: '7-8'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.18'),
            price1: ['35.000', '4.551', '73', '62'],
            price2: ['45.000', '5.852', '94', '80'],
            price3: ['65.000', '8.453', '135', '115'],
            price4: ['53.000', '6.892', '110', '94'],
            price5: ['63.000', '8.192', '131', '112'],
            price6: ['83.000', '10.793', '173', '147'],
            km: '250',
            hr: '7-8'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.19'),
            price1: ['34.000', '4.421', '71', '60'],
            price2: ['46.000', '5.982', '96', '82'],
            price3: ['55.000', '7.152', '114', '98'],
            price4: ['52.000', '6.762', '108', '92'],
            price5: ['64.000', '8.322', '133', '114'],
            price6: ['73.000', '9.493', '152', '130'],
            km: '255',
            hr: '7-8'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.20'),
            price1: ['36.000', '4.681', '75', '64'],
            price2: ['44.000', '5.722', '92', '78'],
            price3: ['60.000', '7.802', '125', '106'],
            price4: ['55.000', '7.152', '114', '98'],
            price5: ['63.000', '8.192', '131', '112'],
            price6: ['79.000', '10.273', '164', '140'],
            km: '260',
            hr: '8-9'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.21'),
            price1: ['43.000', '5.592', '90', '76'],
            price2: ['48.000', '6.242', '100', '85'],
            price3: ['63.000', '8.192', '131', '112'],
            price4: ['62.000', '8.062', '129', '110'],
            price5: ['67.000', '8.713', '139', '119'],
            price6: ['82.000', '10.663', '171', '140'],
            km: '280',
            hr: '8-9'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.22'),
            price1: ['40.000', '5.202', '83', '71'],
            price2: ['45.000', '5.852', '94', '80'],
            price3: ['65.000', '8.453', '135', '115'],
            price4: ['60.000', '7.802', '125', '106'],
            price5: ['65.000', '8.453', '135', '115'],
            price6: ['85.000', '11.053', '177', '151'],
            km: '300',
            hr: '9-10'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.23'),
            price1: ['42.000', '5.462', '87', '75'],
            price2: ['47.000', '6.112', '98', '83'],
            price3: ['68.000', '8.843', '142', '121'],
            price4: ['62.000', '8.062', '129', '110'],
            price5: ['67.000', '8.713', '139', '119'],
            price6: ['88.000', '11.443', '183', '156'],
            km: '300',
            hr: '9-10'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.24'),
            price1: ['44.000', '5.722', '92', '78'],
            price2: ['49.000', '6.372', '102', '87'],
            price3: ['65.000', '8.453', '135', '115'],
            price4: ['64.000', '8.322', '133', '114'],
            price5: ['69.000', '8.973', '144', '122'],
            price6: ['85.000', '11.053', '177', '151'],
            km: '315',
            hr: '9-10'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.25'),
            price1: ['51.000', '6.632', '106', '91'],
            price2: ['67.000', '8.713', '139', '119'],
            price3: ['76.000', '9.883', '158', '135'],
            price4: ['71.000', '9.233', '148', '126'],
            price5: ['87.000', '11.313', '181', '154'],
            price6: ['96.000', '12.484', '200', '170'],
            km: '362',
            hr: '9-10'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.26'),
            price1: ['50.000', '6.502', '104', '89'],
            price2: ['60.000', '7.802', '125', '106'],
            price3: ['78.000', '10.143', '162', '138'],
            price4: ['70.000', '9.103', '146', '124'],
            price5: ['80.000', '10.403', '167', '142'],
            price6: ['98.000', '12.744', '204', '174'],
            km: '400',
            hr: '10-11'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.27'),
            price1: ['55.000', '7.152', '114', '98'],
            price2: ['62.000', '8.062', '129', '110'],
            price3: ['78.000', '10.143', '162', '138'],
            price4: ['75.000', '9.753', '156', '133'],
            price5: ['82.000', '10.663', '171', '146'],
            price6: ['98.000', '12.744', '204', '174'],
            km: '405',
            hr: '10-11'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.28'),
            price1: ['58.000', '7.542', '121', '103'],
            price2: ['68.000', '8.843', '142', '121'],
            price3: ['88.000', '11.443', '183', '156'],
            price4: ['78.000', '10.143', '162', '138'],
            price5: ['88.000', '11.443', '183', '156'],
            price6: ['108.000', '14.044', '225', '192'],
            km: '450',
            hr: '10-11'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.29'),
            price1: ['62.000', '8.062', '129', '110'],
            price2: ['73.000', '9.493', '152', '130'],
            price3: ['98.000', '12.744', '204', '174'],
            price4: ['87.000', '11.313', '181', '154'],
            price5: ['98.000', '12.744', '204', '174'],
            price6: ['123.000', '15.995', '256', '218'],
            km: '525',
            hr: '13-14'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.30'),
            price1: ['65.000', '8.453', '135', '115'],
            price2: ['75.000', '9.753', '156', '133'],
            price3: ['95.000', '12.354', '198', '169'],
            price4: ['90.000', '11.704', '187', '160'],
            price5: ['100.000', '13.004', '208', '177'],
            price6: ['120.000', '15.605', '250', '213'],
            km: '540',
            hr: '12-13'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.31'),
            price1: ['62.000', '8.062', '129', '110'],
            price2: ['74.000', '9.623', '154', '131'],
            price3: ['105.000', '13.654', '219', '186'],
            price4: ['87.000', '11.313', '181', '154'],
            price5: ['99.000', '12.874', '206', '176'],
            price6: ['130.000', '16.905', '271', '231'],
            km: '570',
            hr: '12-13'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.32'),
            price1: ['65.000', '8.453', '135', '115'],
            price2: ['75.000', '9.753', '156', '133'],
            price3: ['135.000', '17.555', '281', '240'],
            price4: ['90.000', '11.704', '187', '160'],
            price5: ['100.000', '13.004', '208', '177'],
            price6: ['160.000', '20.806', '333', '284'],
            km: '620',
            hr: '14-15'
          },
          {
            value: false,
            name: this.$t('tours.privateTours.tours.33'),
            price1: ['140.000', '18.205', '291', '248'],
            price2: ['160.000', '20.806', '333', '284'],
            price3: ['210.000', '27.308', '437', '373'],
            price4: ['180.000', '23.407', '375', '319'],
            price5: ['200.000', '26.008', '416', '355'],
            price6: ['250.000', '32.510', '520', '444'],
            km: '950',
            hr: this.$t('tours.privateTours.days')
          }
        ]
      }
    },
    components: {
      appContactForm: ContactForm
    }
  }
</script>