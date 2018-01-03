import axios from 'axios'
import moment from 'moment'

const url = {
  coinList: 'https://min-api.cryptocompare.com/data/all/coinlist',
  price: 'https://min-api.cryptocompare.com/data/price',
  priceHisorical: 'https://min-api.cryptocompare.com/data/pricehistorical',
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

const coinList = _ => {
  return get(url.coinList).
    then(res => {
      if (res.status === 200 && res.data.Response === 'Success') {
        return res.data
      } else { throw new Error(res.message) }
    })
}

const coinCurrent = (from, to, market) => {
  return get(`${url.price}?fsym=${from}&tsyms=${to}&e=${market}`).
    then(res => {
      if (res.status === 200 && res.data[to]) {
        return res.data[to]
      } else { throw new Error(res.message) }
    })
}

const coinPriceHitorical = (from, to, market, ts) => {
  return get(`${url.priceHisorical}?fsym=${from}&tsyms=${to}&e=${market}&ts=${ts}`).
    then(res => {
      if (res.status === 200 && res.data[from]) {
        return res.data[from][to]
      } else { throw new Error(res.message) }
    })
}

const coinYesterday = (from, to, market) => {
  const ts = moment().add(-1, 'days')
  return coinPriceHitorical(from, to, market, ts)
}

const coinHistorical = (period = 'minute', from, to, market, limit = 360) => {
  return get(`${url.historical[period]}?fsym=${from}&tsym=${to}&e=${market}&limit=${limit}`).
  then(res => {
    if (res.data.Response === 'Success') {
      return res.data.Data
    } else { throw new Error(res.message) }
  })
}

export default {
  coinList,
  coinCurrent,
  coinYesterday,
  coinHistorical
}