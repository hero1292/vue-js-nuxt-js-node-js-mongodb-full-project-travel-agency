<template>
    <div>
        <v-container grid-list-lg>
            <h1 class="my-3 text-xs-center teal--text">Սոցփաթեթ:</h1>
            <v-layout row wrap>
                <v-flex
                        xs12
                        sm6
                        md4
                        v-for="(item, i) in items"
                        :key="i"
                >
                    <v-card>
                        <v-card-media :src="require(`../../../../client/static/socpackage/${item.imgSrc}`)" height="200"></v-card-media>
                        <v-card-title class="title teal--text" primary-title>{{item.title}}</v-card-title>
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
