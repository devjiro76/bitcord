import api from '@/api/cryptocompare'

export const set_coinMetaLoaded = (context, flag) => {
  context.commit('set_coinMetaLoaded', flag)
}

export const add_favorite = (context, item) => {
  context.commit('add_favorite', item)
}

export const remove_favorite = (context, item) => {
  context.commit('remove_favorite', item)
}
