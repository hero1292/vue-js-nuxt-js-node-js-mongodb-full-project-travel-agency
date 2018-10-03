<template>
    <v-btn :to='link' :exact='exact' :flat="flat" :dark="dark" :small="small">
        <slot></slot>
    </v-btn>
</template>

<script>
  export default {
    props: ['to', 'exact', 'flat', 'dark', 'small'],
    computed: {
      link () {
        let to = this.to

        if (to.path && to.locale) {
          to.path = `/${to.locale}` + (to.path === '/' ? '' : `/${to.path}`)
        } else if (to.lang) {
          const path = this.$route.fullPath
            .split('/')
            .splice(2)
            .join('/')

          to.path = `/${to.lang}` + (path ? `/${path}` : '')
        }

        to.params = {
          ...to.params,
          ...{
            lang: this.$i18n.locale
          }
        }

        return to
      }
    }
  }
</script>
