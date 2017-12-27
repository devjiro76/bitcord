import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    favorites: [{
      favId: 0,
      from: 'BTC',
      to: 'KRW',
      market: 'CCCAGG'
    }, {
      favId: 1,
      from: 'BTC',
      to: 'KRW',
      market: 'Bithumb'
    }, {
      favId: 2,
      from: 'ETH',
      to: 'USD',
      market: 'CCCAGG'
    }],
    coinMeta: null,
  },
  mutations,
  actions,
  getters,
  strict: debug,
})
