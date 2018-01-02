export default [
  {
    path: '/about/',
    component: require('./pages/about.vue')
  },
  {
    path: '/form/',
    component: require('./pages/form.vue')
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: require('./pages/dynamic-route.vue')
  },
  //{
  //  path: '/coin-detail/:from/:to/:market/',
  //  component: require('./pages/CoinDetailPage.vue')
  //},
  {
    path: '/test/',
    component: require('./pages/AddNewFav.vue')
  },
  {
    path: '/coin-detail/:from/:to/:market/',
    component: require('./pages/ChartPage.vue')
  }
]