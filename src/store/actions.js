import localforage from 'localforage'
import api from '@/api/cryptocompare'

export const init_favorites = (context) => {
  context.commit('init_favorites')
}

export const set_coinMetaLoaded = (context, flag) => {
  context.commit('set_coinMetaLoaded', flag)
}

export const add_favorite = async (context, item) => {
  const newVal = await localforage_add_favorite(item)
  context.commit('add_favorite', newVal)
}

export const remove_all_favorites = (context) => {
  localforage_remove_all_favorites()
  context.commit('remove_all_favorites')
}

export const remove_favorite = (context, item) => {
  context.commit('remove_favorite', item)
}

const localforage_remove_all_favorites = _ => {
  localforage.clear()
}

const localforage_add_favorite = (item) => {
  localforage.getItem('favorites')
  .then(oldVal => {
    const key = item.favId
    const newVal = _.assign(oldVal, {
      [key]: item
    })
    localforage.setItem('favorites', newVal)
    .then(res => {
      return res
    })
  })
}