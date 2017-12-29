import localforage from 'localforage'
import api from '@/api/cryptocompare'

export const init_favorites = (context) => {
  context.commit('init_favorites')
}

export const set_coinMetaLoaded = (context, flag) => {
  context.commit('set_coinMetaLoaded', flag)
}

export const add_favorite = (context, item) => {
  localforag_save_favorite(item)
  context.commit('add_favorite', item)
}

export const remove_favorite = (context, item) => {
  context.commit('remove_favorite', item)
}


const localforag_save_favorite = (item) => {
  localforage.getItem('favorites')
  .then(oldVal => {
    const key = item.favId
    const newVal = _.assign(oldVal, {
      [key]: item
    })
    localforage.setItem('favorites', newVal)
    .then(res=> {console.log('for', res)})
  })
}