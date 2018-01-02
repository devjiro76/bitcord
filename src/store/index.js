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
      43: {
        from: 'BTC',
        to: 'KRW',
        market: 'Bithumb'
      }
    },
    coinMetaLoaded: false,
  },
  mutations,
  actions,
  getters,
  strict: debug,
})
