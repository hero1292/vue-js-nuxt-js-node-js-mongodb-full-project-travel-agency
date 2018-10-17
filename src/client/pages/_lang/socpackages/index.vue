<template>
    <div>
        <v-container grid-list-lg>
            <h1 class="display-1 my-3 text-xs-center primary--text">Սոցփաթեթ:</h1>
            <h3 class="headline my-3 text-xs-center red--text">Զանգահարեք մեզ, և մենք սիրով կպատասխանենք ձեր բոլոր հարցերին:</h3>
            <v-layout row wrap>
                <v-flex
                        xs12
                        sm6
                        md4
                        v-for="(item, i) in items"
                        :key="i"
                >
                    <v-card>
                        <v-img :src="require(`../../../../client/static/socpackage/${item.imgSrc}`)" height="200"></v-img>
                        <v-card-title class="title primary--text" primary-title>{{item.title}}</v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
  export default {
    computed: {
      items () {
        return [
          {title: 'Ծաղկաձոր', imgSrc: '1.jpg'},
          {title: 'Աղվերան', imgSrc: '2.jpg'},
          {title: 'Հանքավան', imgSrc: '3.jpg'},
          {title: 'Աղավնաձոր', imgSrc: '4.jpg'},
          {title: 'Դիլիջան', imgSrc: '5.jpg'},
          {title: 'Սևան', imgSrc: '6.jpg'},
          {title: 'Ստեփանավան', imgSrc: '7.jpg'},
          {title: 'Վանաձոր', imgSrc: '8.jpg'},
          {title: 'Ջերմուկ', imgSrc: '9.jpg'},
          {title: 'Բյուրական', imgSrc: '10.jpg'},
          {title: 'Իջևան', imgSrc: '11.jpg'},
          {title: 'Եղեգնաձոր, Վայք', imgSrc: '12.jpg'},
          {title: 'Արցախ', imgSrc: '13.jpg'},
          {title: 'Հաղպատ', imgSrc: '14.jpg'},
          {title: 'Սյունիք', imgSrc: '15.jpg'},
          {title: 'Գյումրի', imgSrc: '16.jpg'}
        ]
      }
    }
  }
</script>
