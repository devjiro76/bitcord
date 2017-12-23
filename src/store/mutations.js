import _ from 'lodash'

export const add_favorite = (state, item) => {
  const record = state.favorites.find(p => (
    p.from === item.from &&
    p.to === item.to &&
    p.market === item.market
  ))

  if (!record) {
    state.favorites.push(item)
  } else {
    return false
  }
}

export const remove_favorite = (state, favId) => {
  console.log('store dlete:', favId)
  _.remove(state.favorites, p => (
    p.favId === favId
  ))
  console.log('store after del:', state.favorites)
}
