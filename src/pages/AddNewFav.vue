<template>
  <f7-page>
    <f7-navbar title="코인목록" back-link="뒤로" sliding></f7-navbar>

    <f7-list form class="no-margin">
      <f7-list-item>
        <f7-label>코인</f7-label>
        <f7-input type="text" placeholder="영문명" v-model="searchKeyword"/>
      </f7-list-item>
    </f7-list>
    <div>
      <f7-card  
        v-for="item in searchedCoins || pagedCoins"
        :key="item.Id"
        :title="item.Name"
        color="blue-grey darken-2"
        class="white--text"
      >
        <f7-card-header>코인이름: {{ item.FullName }}</f7-card-header>
        <f7-card-content>총공급코인갯수: {{ item.TotalCoinSupply | thousand }}</f7-card-content>
        <f7-card-footer>
          <f7-button @click="addFavor(item.Id)">관심코인 추가</f7-button>
        </f7-card-footer>
      </f7-card>
    </div>

    <!--f7-list
      id="search-list"
      class="searchbar-found"
    >
      <f7-list-item
        v-for="(item, key) in coinMeta.Data"
        :key="key"
        :title="item.Name"
        link="/form/"
      >
      <f7-button>haha</f7-button>
      </f7-list-item>
    </f7-list-->
  </f7-page>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  data: _ => ({
    searchKeyword: '',
  }),
  methods: {
    addFavor(itemId) {
      console.log(itemId)
      
      const coin = _.find(Vue.$coinMeta.Data, { Id: itemId })
      console.log(coin)

      this.$store.dispatch('add_favorite', {
        favId: itemId,
        from: coin.Name,
        to: 'USD',
        market: 'CCCAGG'
      })
    }
  },
  computed: {
    ...mapGetters([
      'coinMeta',
    ]),
    pagedCoins() {
      const sample =  _.sampleSize(Vue.$coinMeta.Data, 100)
      console.log(sample)
      return sample
    },
    searchedCoins() {
      if (!this.searchKeyword || !this.searchKeyword.length) return false

      const searchKeyword = this.searchKeyword.toLowerCase()
      const res = _.pickBy(Vue.$coinMeta.Data, (coin) => {
        const name = coin.Name.toLowerCase()
        const coinName = coin.CoinName.toLowerCase()
        const fullName = coin.FullName.toLowerCase()

        return name.includes(searchKeyword) || coinName.includes(searchKeyword) || fullName.includes(searchKeyword)
      }) || null
      console.log(res)
      return res
    }
  },
}
</script>