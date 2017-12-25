<template>
  <div>
    <f7-link href="/coin-detail/from/BTC/to/KRW/market/CCCAGG/">haha</f7-link>
    <f7-block-title>나의 관심코인</f7-block-title>

    <f7-list
      id="sortable"
      media-list
      sortable
      @sortable:sort="onSort"
      @sortable:open="onOpen"
      @sortable:close="onClose"
    >
      <f7-list-item
        v-for="item in myFavorites"
        media-item
        :swipeout="false"
        :key="item.favId"
        :media="item.media"
        :title="item.title"
        :subtitle="item.subtitle"
        :text="item.text"
        :after="item.after"
        :link="item.link"
        @swipeout:delete="onSwipeoutDelete(item.favId)"
        @swipeout:deleted="onSwipeoutDeleted(item.favId)"
      >
        <f7-swipeout-actions>
          <f7-swipeout-button delete>삭제</f7-swipeout-button>
        </f7-swipeout-actions>

        </f7-list-item>
      </f7-list-item>
      <f7-list-label>
        <f7-link toggle-sortable="#sortable">순서변경</f7-link>
      </f7-list-label>
    </f7-list>
    </f7-list>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import _ from 'lodash'
import api from '@/api/cryptocompare'

export default {
  data: _ => ({
    intervalId: [],
    coinMeta: null,
    myFavorites: [],
  }),

  async created() {
    await this.getCoinMeta()
    this.getAllCoinData()
    this.intervalId.push(setInterval(this.getAllCoinData, 1000 * 10))
  },

  destroyed() {
    this.clearAllIntervals()
  },

  methods: {
    clearAllIntervals() {
      this.intervalId.forEach(id => {
        clearInterval(id);
      })
    },

    async getCoinMeta() {
      this.coinMeta = await api.getCoinList()
    },

    getAllCoinData() {
      this.getFavorite.forEach(item => {
        this.getCoinData(item.favId, item.from, item.to, item.market)
      })
    },

    async getCoinData(favId=0, from='BTC', to='KRW', market='Bithumb') {
      const baseURl = this.coinMeta.BaseImageUrl
      const coinUrl = this.coinMeta.Data[from].ImageUrl
      const coinImg = baseURl + coinUrl
      const coinInfo = {
        favId,
        from,
        to,
        market,
        title: `${from} - ${market}`,
        subtitle: `${Vue.options.filters.thousand(price)} ${to}`,
        media: `<img src='${coinImg}' width='50'>`,
        link: `/coin-detail/from/${from}/to/${to}/market/${market}`
      }

      let record = this.myFavorites.findIndex(p => !!(
        p.favId === favId
      ))

      if (record >= 0) {
        Vue.set(this.myFavorites, record, coinInfo)
      } else {
        record = this.myFavorites.push(coinInfo) - 1
      }

      const price = await api.getCoinData(from, to, market)

      Vue.set(this.myFavorites[record], 'subtitle', `${Vue.options.filters.thousand(price)} ${to}`)
    },

    onSwipeoutDelete(favId) {
      console.log('local delte :', favId)
      _.remove(this.myFavorites, p => (
        p.favId === favId
      ))
      this.$store.dispatch('remove_favorite', favId)
      console.log('local after delte :', this.myFavorites)
    },
    onSwipeoutDeleted() {
    },
    onOpen: function () {
      this.sorting = !this.sorting;
    },
    onClose: function () {
      this.sorting = !this.sorting;
    },
    onSort: function (event, indexes) {
        console.log('sort', indexes);
    },
  },

  computed: {
    ...mapGetters([
      'getFavorite', //getter of Vuex
    ])
  },

  watch: {
    getFavorite: function () {
      console.log('somethign changed!')
      this.getAllCoinData()
    }
  },

  components: {
  }
}
</script>

<style scoped>

</style>
