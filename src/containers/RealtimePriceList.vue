<template>
  <div>

    <f7-block-title>실시간 가격정보</f7-block-title>

    <PriceList :items="modifiedPrices">
      <div slot="label">
        <f7-list-label>
          <f7-link toggle-sortable="#sortable">순서변경</f7-link>
        </f7-list-label>
      </div>
    </PriceList>

  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'

import { api } from '@/util/function'
import { cryptocompare } from '@/util/const'

import listMediaSwipe from '@/components/listMediaSwipe'

export default {
  data: _ => ({
    intervalId: [],
    coinMeta: {},
    prices: {},
  }),

  async created() {
    await this.getCoinList()
    await this.loopDrawPrices()
  },

  methods: {
    async getCoinList() {
      this.coinMeta = await api.get(cryptocompare.coinList).
        then(res => {
          if (res.data.Response === 'Success') {
            return res.data
          } else { throw new Error(res.message) }
        }).
        catch(e => console.error(e))
    },

    loopDrawPrices() {
      this.drawPrices()
      this.intervalId.push(
        setInterval(this.drawPrices, 1000 * 10)
      )
    },

    loopDrawHistoricalChart() {
      this.intervalId = setInterval(this.drawChart, 1000 * 60);
    },

    clearAllIntervals() {
      this.intervalId.forEach(id => {
        clearInterval(id);
      })
    },

    drawPrices() {
      this.getPrices('BTC', 'KRW', 'CCCAGG')
      this.getPrices('BTC', 'KRW', 'Bithumb')
      this.getPrices('ETH', 'KRW')
    },

    async getPrices(from='BTC', to='KRW', market='CCCAGG') {
      const url = `${cryptocompare.price}?fsym=${from}&tsyms=${to}&e=${market}`
      const keyName = `${from}_${to}_${market}`

      try {
        const price = await api.get(url).
          then(res => {
            if (res.status === 200) {
              return res.data[to]
            } else { throw new Error(res.message) }
          })

        Vue.set(this.prices, keyName, {
          from,
          to,
          market,
          price,
        })
        console.log(price)
      } catch(e) {
        console.error('getPrices Error!', e);
      }
    },
  },

  computed: {
    modifiedPrices() {
      
      return _.values(
        _.map(this.prices, coin => {
          const baseURl = this.coinMeta.BaseImageUrl
          const coinImg = baseURl + this.coinMeta.Data[coin.from].ImageUrl

          return {
            title: `${coin.from} - ${coin.market}`,
            subtitle: `${Vue.options.filters.thousand(coin.price)} ${coin.to}`,
            media: `<img src=${coinImg} width=50>`,
          }
        })
      )
    },



      /*
      return [{
        media: "<img src='https://www.cryptocompare.com/media/19633/btc.png' height='60'>",
        title: 'haha',
        subtitle: 'hoho',
      }, {
        media: "<img src='https://www.cryptocompare.com/media/19633/btc.png' height='60'>",
        title: 'haha',
        subtitle: 'hoho',
      }]
      */
  },

  components: {
    PriceList: listMediaSwipe,
  }
}
</script>

<style scoped>

</style>