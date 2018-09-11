<template>
    <v-list-tile :to='link' :exact='exact'>
        <slot></slot>
    </v-list-tile>
</template>

<script>
  export default {
    props: ['to', 'exact'],
    computed: {
      link () {
        let to = this.to

        if (to.name) {
          to.name = to.name === 'index' ? to.name : `lang-${to.name}`
        } else if (to.path && to.locale) {
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
