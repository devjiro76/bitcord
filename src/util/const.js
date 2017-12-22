export const cryptocompare = {
  coinList: 'https://min-api.cryptocompare.com/data/all/coinlist',
  price: 'https://min-api.cryptocompare.com/data/price',
  historical: {
    minute: 'https://min-api.cryptocompare.com/data/histominute',
    hour: 'https://min-api.cryptocompare.com/data/histohour',
    day: 'https://min-api.cryptocompare.com/data/histoday',
  },
}
/*
https://www.coindesk.com/api/

bitcoin: {
  url: 'https://api.blockchain.info/charts/market-price?timespan=5weeks&rollingAverage=8hours&format=json&cors=true'
},
cryptocompare_reltime: {
  url: https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=KRW,BTC,USD,EUR
}
coindesk_realtime: {
  url: 'https://api.coindesk.com/v1/bpi/currentprice/KRW.json'
},
coindesk_history: {
  url: 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=KRW&start=2017-11-01&end=2017-12-19'
}
*/
