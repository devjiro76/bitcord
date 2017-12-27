<template>
  <f7-page>
    <f7-navbar title="종목상세" back-link="뒤로" sliding></f7-navbar>
    <f7-block-title>
      {{ $route.params.from }} - {{ $route.params.to }}
    </f7-block-title>
    <f7-block>
      <div id="test"></div>
    </f7-block>
  </f7-page>
</template>

<style scoped>
.content-block {
  height: calc(100% - 70px);
}

#test,
.content-block-inner {
  height: 100%;
}
</style>

<script>
import './tv.js'

const symbolsPool = {
  BTCKRW: 'XCOIN:BTCKRW',
  ETHKRW: 'KORBIT:ETHKRW',
  ETHUSD: 'COINBASE:ETHUSD',
}

export default {
  data: _ => ({
  }),
  mounted() {
    const fromTo = `${this.$route.params.from}${this.$route.params.to}` 

    console.log('fromTo:', fromTo)
    const symbol = symbolsPool[fromTo]

    console.log('symbol:', symbol)

    new TradingView.widget({
      "container_id": 'test',
      "autosize": true,
      "symbol": `${symbol}`,
      "interval": "1D",
      "timezone": "Etc/UTC",
      "theme": "Light",
      "style": "1",
      "locale": "kr",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "hideideas": true
    })
  }
}
/*
https://s.tradingview.com/widgetembed/?symbol=XCOIN%3ABTCKRW&interval=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&hideideas=1&theme=Light&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=kr&utm_source=&utm_medium=widget&utm_campaign=chart&utm_term=XCOIN%3ABTCKRW
*/
</script>
