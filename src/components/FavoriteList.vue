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
        media-item
        swipeout
        v-for="item in myFavorites"
        :key="item.favId"
        :media="item.media"
        :title="item.title"
        :subtitle="item.subtitle"
        :text="item.text"
        :after="item.after"
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
import { api } from '@/util/function'
import { cryptocompare } from '@/util/const'

export default {
  data: _ => ({
    intervalId: [],
    coinMeta: null,
    myFavorites: [],
  }),

  async created() {
    await this.getCoinMeta()
    await this.getAllCoinData()
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
      this.coinMeta = await api.get(cryptocompare.coinList).
        then(res => {
          if (res.status === 200) {
            return res.data
          } else { throw new Error(res.message) }
        }).
        catch(e => console.error(e))
    },

    getAllCoinData() {
      this.getFavorite.forEach(item => {
        this.getCoinData(item.favId, item.from, item.to, item.market)
      })
    },

    async getCoinData(favId=0, from='BTC', to='KRW', market='Bithumb') {
      const url = `${cryptocompare.price}?fsym=${from}&tsyms=${to}&e=${market}`

      const price = await api.get(url).
        then(res => {
          if (res.status === 200) {
            return res.data[to]
          } else { throw new Error(res.message) }
        })

      const baseURl = this.coinMeta.BaseImageUrl
      const coinUrl = this.coinMeta.Data[from].ImageUrl
      const coinImg = baseURl + coinUrl

      const record = this.myFavorites.findIndex(p => !!(
        p.from === from &&
        p.to === to &&
        p.market === market
      ))

      if (record >= 0) {
        Vue.set(this.myFavorites, record, {
          favId,
          from,
          to,
          market,
          price,
          title: `${from} - ${market}`,
          subtitle: `${Vue.options.filters.thousand(price)} ${to}`,
          media: `<img src='${coinImg}' width='50'>`,
        })
      } else {
        this.myFavorites.push({
          favId,
          from,
          to,
          market,
          price,
          title: `${from} - ${market}`,
          subtitle: `${Vue.options.filters.thousand(price)} ${to}`,
          media: `<img src='${coinImg}' width='50'>`,
        })
      }
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
      'getFavorite',
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
