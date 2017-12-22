import Vue from 'vue'

import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'

import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
/* OR for Material Theme:
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
*/

import chartist from 'vue-chartist'

import Routes from './routes.js'
import App from './app'
import './util/filters' //filters
import AppStyles from './css/app.css'

Vue.use(Framework7Vue)
Vue.use(chartist, {
    messageNoData: "You have not enough data",
    classNoData: "empty"
})

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: Routes,
  },
  components: {
    app: App
  },
});
