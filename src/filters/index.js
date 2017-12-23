import Vue from 'vue'

import numeral from 'numeral'
import moment from 'moment'

export const thousand = (num) => {
  return numeral(num).format('0,0')
}

export const unix2date = (timestamp, formmat) => {
    return moment.unix(timestamp).format(format)
}
