import _ from 'lodash'
import localforage from 'localforage'

export const init_favorites = (state) => {
  localforage.getItem('favorites')
    .then(oldVal => {
      state.favorites = oldVal
    })
}

export const set_coinMetaLoaded = (state, flag) => {
  state.coinMetaLoaded = flag
}

export const add_favorite = (state, item) => {
  const key = item.favId
  _.assign(state.favorites, {
    [key]: item
  })
}

export const remove_favorite = (state, favId) => {
  console.log('store delete:', favId)
  _.remove(state.favorites, p => (
    p.favId === favId
  ))
  console.log('store after del:', state.favorites)
}
