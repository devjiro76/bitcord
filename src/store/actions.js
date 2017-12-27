import api from '@/api/cryptocompare'

export const get_coinMeta = async (context) => {
  const item = await api.coinList()
  context.commit('get_coinMeta', item)
}

export const add_favorite = (context, item) => {
  context.commit('add_favorite', item)
}

export const remove_favorite = (context, item) => {
  context.commit('remove_favorite', item)
}
