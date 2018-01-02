import _ from 'lodash'

export const set_coinMetaLoaded = (state, flag) => {
  state.coinMetaLoaded = flag
}

export const set_favorites = (state, item) => {
  console.log('mutation, ', item)
  state.favorites = item
}

export const remove_favorite = (state, favId) => {
  console.log('store delete:', favId)
  _.remove(state.favorites, p => (
    p.favId === favId
  ))
  console.log('store after del:', state.favorites)
}
