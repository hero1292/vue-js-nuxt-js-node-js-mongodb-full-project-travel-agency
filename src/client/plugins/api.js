import axios from 'axios'

export default ({ app }, inject) => {
  app.api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  inject('api', app.api)
}
