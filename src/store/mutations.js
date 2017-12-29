import _ from 'lodash'

export const set_coinMetaLoaded = (state, flag) => {
  state.coinMetaLoaded = flag
}

export const add_favorite = (state, item) => {
  const key = item.favId
  console.log(_.assign(state.favorites, {
    [key]: item
  }))

  state.favorites[key] = item
}

export const remove_favorite = (state, favId) => {
  console.log('store delete:', favId)
  _.remove(state.favorites, p => (
    p.favId === favId
  ))
  console.log('store after del:', state.favorites)
}
