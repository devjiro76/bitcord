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
          color="red"
          :disabled="!coinMetaLoaded"
        >관심코인 추가하기</f7-button>
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
    myFavorites: [],
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
      this.intervalId.push(setInterval(this.getAllCoinData, 1000 * 10))
    },

    getAllCoinData() {
      _.map(this.favorites, item => {
        this.getCoinData(item.favId, item.from, item.to, item.market)
      })
    },

    async getCoinData(favId=0, from='BTC', to='KRW', market='Bithumb') {
      const baseURl = Vue.$coinMeta.BaseImageUrl
      const coinUrl = Vue.$coinMeta.Data[from].ImageUrl
      const coinImg = baseURl + coinUrl
      const coinInfo = {
        favId,
        from,
        to,
        market,
        text: `${from} - ${market}`,
        media: `<img src='${coinImg}' width='50'>`,
        link: `/coin-detail/${from}/${to}/${market}`
      }

      let record = this.myFavorites.findIndex(p => !!(
        p.favId === favId
      ))

      if (record >= 0) {
        const mergedInfo = _.assign(this.myFavorites[record], coinInfo)
        Vue.set(this.myFavorites, record, mergedInfo)
      } else {
        record = this.myFavorites.push(coinInfo) - 1
      }

      const price = await api.coinCurrent(from, to, market)
      Vue.set(this.myFavorites[record], 'title', `${Vue.options.filters.thousand(price)} ${to}`)

      const yPrice = await api.coinYesterday(from, to, market)
      Vue.set(this.myFavorites[record], 'subtitle', `${Vue.options.filters.thousand(yPrice)} ${to}`)
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
      'favorites',
      'coinMetaLoaded'
    ]),
  },

  watch: {
    favorites: function () {
      console.log('somethign changed!')
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
