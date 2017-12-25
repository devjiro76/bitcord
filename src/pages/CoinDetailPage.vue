<template>
  <f7-page>
    <f7-navbar title="종목상세" back-link="뒤로" sliding></f7-navbar>
    <f7-block-title></f7-block-title>
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

export default {
  data: _ => ({
  }),
  mounted() {
    //console.log($route)
    console.log('detail page')
    console.log(TradingView)

    new TradingView.widget({
      "container_id": 'test',
      "autosize": true,
      "symbol": "XCOIN:BTCKRW",
      "interval": "1",
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
