<template>
  <index />
</template>

<script>
  import Index from './_lang/index.vue'

  export default {
    components: {
      Index
    },
    head () {
      return {
        title: this.$t('links.home')
      }
    }
  }
</script>
