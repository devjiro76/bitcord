import localforage from 'localforage'
import api from '@/api/cryptocompare'

export const set_coinMetaLoaded = (context, flag) => {
  context.commit('set_coinMetaLoaded', flag)
}

export const init_favorites = (context) => {
  localforage.getItem('favorites')
    .then(oldVal => {
      console.log(0, oldVal)
      context.commit('set_favorites', oldVal)
    })
}

export const add_favorite = (context, item) => {
  localforage.getItem('favorites')
    .then(oldVal => {
      const newVal = _.assign(oldVal, item)

      localforage.setItem('favorites', newVal)
      context.commit('set_favorites', newVal)
    })
}

export const remove_all_favorites = (context) => {
  localforage.clear()
  context.commit('set_favorites', {})
}

export const remove_favorite = (context, item) => {
  context.commit('remove_favorite', item)
}
