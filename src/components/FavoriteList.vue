<template>
  <div>
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
        v-for="(item, key) in myFavorites"
        media-item
        :swipeout="false"
        :key="key"
        :media="item.media"
        :title="item.title"
        :subtitle="item.subtitle"
        :text="item.text"
        :after="item.after"
        :link="item.link"
        @swipeout:delete="onSwipeoutDelete(key)"
        @swipeout:deleted="onSwipeoutDeleted(key)"
      >
        <!--f7-swipeout-actions>
          <f7-swipeout-button delete>삭제</f7-swipeout-button>
        </f7-swipeout-actions-->
      </f7-list-item>

      <f7-list-label>
        <!--f7-link toggle-sortable="#sortable">순서변경</f7-link-->
        <f7-button
          href="/test/"
          round
          rasied
          fill
          big
          color="blue"
          :disabled="!coinMetaLoaded"
        >관심코인 추가하기</f7-button>
        <f7-button
          @click="removeAllFavorites"
          round
          rasied
          fill
          big
          color="red"
        >관심코인 삭제하기</f7-button>
      </f7-list-label>
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
    myFavorites: {},
  }),

  destroyed() {
    this.clearAllIntervals()
  },

  methods: {
    clearAllIntervals() {
      this.intervalId.map(id => {
        clearInterval(id);
      })
    },

    triggerGetAllCoinData() {
      this.getAllCoinData()
      this.intervalId.push(setInterval(this.getAllCoinData, 500 * 10))
    },

    getAllCoinData() {
      /*
      _.map(this.myFavorites, (coin, coinId) => {
        const record = _.pick(this.favorites, coinId)
        if (_.isEmpty(record)) {
          const omitted = _.omit(this.myFavorites, coinId)
          Vue.set(this.myFavorites, omitted)
        }
      })
      */

      _.map(this.favorites, (coin, coinId) => {
        this.getCoinData(coin, coinId)
      })
    },

    async getCoinData({from, to, market}, coinId) {
      console.log("---getCoinData---")
      const record = _.find(this.myFavorites, {from, to, market})

      if (!record) {
        const baseURl = Vue.$coinMeta.BaseImageUrl
        const coinUrl = Vue.$coinMeta.Data[from].ImageUrl
        const coinImg = baseURl + coinUrl

        Vue.set(this.myFavorites, coinId, {
          from,
          to,
          market,
          text: `${from} - ${market}`,
          media: `<img src='${coinImg}' width='50'>`,
          link: `/coin-detail/${from}/${to}/${market}`
        })
      }

      const price = await api.coinCurrent(from, to, market)
      console.log('price', price)
      Vue.set(this.myFavorites[coinId], 'title', `${Vue.options.filters.thousand(price)} ${to}`)

      const yPrice = await api.coinYesterday(from, to, market)
      Vue.set(this.myFavorites[coinId], 'subtitle', `${Vue.options.filters.thousand(yPrice)} ${to}`)
    },

    removeAllFavorites() {
      this.$store.dispatch('remove_all_favorites')
    },

    onSwipeoutDelete(coinId) {
      _.remove(this.myFavorites, p => (
        p.coinId === coinId
      ))
      this.$store.dispatch('remove_favorite', coinId)
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
      'favorites',
      'coinMetaLoaded'
    ]),
  },

  watch: {
    favorites: function () {
      this.getAllCoinData()
    },

    coinMetaLoaded: function() {
      this.triggerGetAllCoinData()
    }
  },

  components: {
  }
}
</script>

<style scoped>

</style>
