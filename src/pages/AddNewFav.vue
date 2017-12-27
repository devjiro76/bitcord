<template>
  <f7-page>
    <f7-navbar title="코인목록" back-link="뒤로" sliding></f7-navbar>

    <div>
      <f7-card  
        v-for="(item, key) in pagedCoins"
        :key="key"
        :title="item.Name"
        color="blue-grey darken-2"
        class="white--text"
      >
        <f7-card-header>코인이름: {{ item.FullName }}</f7-card-header>
        <f7-card-content>총공급코인갯수: {{ item.TotalCoinSupply | thousand }}</f7-card-content>
        <f7-card-footer>Card footer content</f7-card-footer>
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
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  data: _ => ({
    allCoins: null,
  }),
  mounted() {
    //console.log(this.coinMeta)
    this.allCoins = this.coinMeta.Data
  },
  computed: {
    ...mapGetters([
      'coinMeta',
    ]),
    pagedCoins() {
      console.log(_.sampleSize(this.allCoins, 100))
      return _.sampleSize(this.allCoins, 100)
    }
  },
  methods: {
    onSearch: function (query, found) {
      console.log('search', query);
      console.log(found)
    },
    onClear: function (event) {
      console.log('clear');
    },
    onEnable: function (event) {
      console.log('enable');
    },
    onDisable: function (event) {
      console.log('disable');
    },
  },
}
</script>