import axios from 'axios'

const option = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Max-Age': 3600,
  },
}

const get = (url, option) => {
  return axios({
    method: 'GET',
    url,
    option,
  })
  .then(res => (res))
  .catch(e => { throw e })
}

export const api = {
  get,
}