import axios from 'axios'

import { API_URL } from './config'

// enum Status {
//   BAD_REQUEST = 400,
//   UNAUTHORIZED = 401,
//   FORBIDDEN = 403,
//   NOT_FOUND = 404,
//   SERVER_ERROR = 500,
// }

export function configureHttpClient() {
  let baseURL: string
  if (API_URL) baseURL = `${API_URL}`
  else baseURL = '/v1' // fallback

  axios.defaults.headers['Content-Type'] = 'application/json'

  axios.defaults.baseURL = baseURL
}
