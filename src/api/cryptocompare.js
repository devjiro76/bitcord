import axios from 'axios'

const url = {
  coinList: 'https://min-api.cryptocompare.com/data/all/coinlist',
  price: 'https://min-api.cryptocompare.com/data/price',
  historical: {
    minute: 'https://min-api.cryptocompare.com/data/histominute',
    hour: 'https://min-api.cryptocompare.com/data/histohour',
    day: 'https://min-api.cryptocompare.com/data/histoday',
  },
}

const option = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Max-Age': 3600,
  },
}

const get = (url) => {
  return axios({
    method: 'GET',
    url,
    option,
  })
    .then(res => (res))
    .catch(e => { throw e })
}

const getCoinList = _ => {
  return get(url.coinList).
    then(res => {
      if (res.status === 200 && res.data.Response === 'Success') {
        return res.data
      } else { throw new Error(res.message) }
    })
}

const getCoinData = (from, to, market) => {
  return get(`${url.price}?fsym=${from}&tsyms=${to}&e=${market}`).
    then(res => {
      if (res.status === 200 && res.data[to]) {
        return res.data[to]
      } else { throw new Error(res.message) }
    })
}

export default {
  getCoinList,
  getCoinData,
}