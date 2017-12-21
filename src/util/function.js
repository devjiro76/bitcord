import axios from 'axios'
import moment from 'moment'
import numeral from 'numeral'

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

export const unix2date = (timestamp, format) => (
  moment.unix(timestamp).format(format)
)

export const thousand = (input) => {
  return numeral(input).format('0,0.00')
}
