import Vue from 'vue'
import numeral from 'numeral'
import moment from 'moment'


Vue.filter('thousand', (num) => {
  if (typeof num) {
    return numeral(num).format('0,0.00')
  } else {
    throw new Error('Not Number')
  }
})

Vue.filter('unix2date', (timestamp, formmat) => {
  if (typeof timestamp) {
    return moment.unix(timestamp).format(format)
  } else {
    throw new Error('Not Timestamp')
  }
})