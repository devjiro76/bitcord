import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    favorites: {
      0: {
        favId: 0,
        from: 'BTC',
        to: 'KRW',
        market: 'CCCAGG'
      },
      1: {
        favId: 1,
        from: 'BTC',
        to: 'KRW',
        market: 'Bithumb'
      },
      2: {
        favId: 2,
        from: 'ETH',
        to: 'USD',
        market: 'CCCAGG'
      }
    },
    coinMetaLoaded: false,
  },
  mutations,
  actions,
  getters,
  strict: debug,
})
