import axios from 'axios'
import moment from 'moment'

export const get = (url, option) => {
  return axios({
    method: 'GET',
    url,
    option,
  })
  .then((res) =>  (res))
}

export const unix2date = (timestamp, format) => (
  moment.unix(timestamp).format(format)
)