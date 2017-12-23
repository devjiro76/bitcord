export const add_favorite = (context, item) => {
  context.commit('add_favorite', item)
}

export const remove_favorite = (context, item) => {
  context.commit('remove_favorite', item)
}
