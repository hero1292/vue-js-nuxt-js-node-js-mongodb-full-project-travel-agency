export default ({ app, store, route, req }) => {
  let locale =
    route.params.lang ||
    app.$cookies.get('locale') ||
    (process.server
      ? req.headers['accept-language']
      : navigator.language
    )
      .split(',')[0]
      .toLocaleLowerCase()

  if (store.state.locales.includes(locale)) {
    app.$axios.defaults.headers.common['Accept-Language'] = locale
    app.$cookies.set('locale', locale)
    store.commit('SET_LANG', locale)
    app.i18n.locale = locale
  }
}
