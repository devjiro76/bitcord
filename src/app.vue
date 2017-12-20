<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal layout="dark">
      <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar v-if="$theme.ios" title="Left Panel" sliding></f7-navbar>
        <f7-pages>
          <f7-page>
            <f7-navbar v-if="$theme.material" title="Left Panel" sliding></f7-navbar>
            <f7-block inner>
              <p>Left panel content goes here</p>
            </f7-block>
            <f7-block-title>Load page in panel</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About"></f7-list-item>
              <f7-list-item link="/form/" title="Form"></f7-list-item>
            </f7-list>
            <f7-block-title>Load page in main view</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About" link-view="#main-view" link-close-panel></f7-list-item>
              <f7-list-item link="/form/" title="Form" link-view="#main-view" link-close-panel></f7-list-item>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <!-- Right Panel -->
    <f7-panel right cover layout="dark">
      <f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar v-if="$theme.ios" title="Right Panel" sliding></f7-navbar>
        <f7-pages>
          <f7-page>
            <f7-navbar v-if="$theme.material" title="Right Panel" sliding></f7-navbar>
            <f7-block>
              <p>Right panel content goes here</p>
            </f7-block>
            <f7-block-title>Load page in panel</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About"></f7-list-item>
              <f7-list-item link="/form/" title="Form"></f7-list-item>
            </f7-list>
            <f7-block-title>Load page in main view</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About" link-view="#main-view" link-close-panel></f7-list-item>
              <f7-list-item link="/form/" title="Form" link-view="#main-view" link-close-panel></f7-list-item>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
          <f7-nav-left>
            <f7-link icon="icon-bars" open-panel="left"></f7-link>
          </f7-nav-left>
          <f7-nav-center sliding>Framework7</f7-nav-center>
          <f7-nav-right>
            <f7-link icon="icon-bars" open-panel="right"></f7-link>
          </f7-nav-right>
        </f7-navbar>
        <!-- Pages -->
        <f7-pages>
          <f7-page>
            <!-- Material Theme Navbar -->
            <f7-navbar v-if="$theme.material">
              <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
              </f7-nav-left>
              <f7-nav-center sliding>Framework7</f7-nav-center>
              <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="right"></f7-link>
              </f7-nav-right>
            </f7-navbar>
            <!-- Page Content -->
            <f7-block-title>Welcome to my App</f7-block-title>

            <f7-block inner>
              <!--VueC3 :handler="handler"></VueC3-->
              <chartist
                id-chart="ct-chart"
                :ratio="chart.ratio"
                :type="chart.type"
                :data="chart.data"
                :options="chart.options" />
            </f7-block>

            <f7-block inner>
              <p>Duis sed erat ac eros ultrices pharetra id ut tellus. Praesent rhoncus enim ornare ipsum aliquet ultricies. Pellentesque sodales erat quis elementum sagittis.</p>
            </f7-block>
            <f7-block-title>Navigation</f7-block-title>
            <f7-list>
              <f7-list-item link="/about/" title="About"></f7-list-item>
              <f7-list-item link="/form/" title="Form"></f7-list-item>
              <f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></f7-list-item>
            </f7-list>
            <f7-block-title>Side Panels</f7-block-title>
            <f7-block>
              <f7-grid>
                <f7-col width="50">
                  <f7-button open-panel="left">Left Panel</f7-button>
                </f7-col>
                <f7-col width="50">
                  <f7-button open-panel="right">Right Panel</f7-button>
                </f7-col>
              </f7-grid>
            </f7-block>
            <f7-block-title>Modals</f7-block-title>
            <f7-block>
              <f7-grid>
                <f7-col width="50">
                  <f7-button open-popup="#popup">Popup</f7-button>
                </f7-col>
                <f7-col width="50">
                  <f7-button open-login-screen="#login-screen">Login Screen</f7-button>
                </f7-col>
              </f7-grid>
            </f7-block>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>

    <!-- Popup -->
    <f7-popup id="popup">
      <f7-view navbar-fixed>
        <f7-pages>
          <f7-page>
            <f7-navbar title="Popup">
              <f7-nav-right>
                <f7-link close-popup>Close</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</f7-block>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-popup>

    <!-- Login Screen -->
    <f7-login-screen id="login-screen">
      <f7-view>
        <f7-pages>
          <f7-page login-screen>
            <f7-login-screen-title>Login</f7-login-screen-title>
            <f7-list form>
              <f7-list-item>
                <f7-label>Username</f7-label>
                <f7-input name="username" placeholder="Username" type="text"></f7-input>
              </f7-list-item>
              <f7-list-item>
                <f7-label>Password</f7-label>
                <f7-input name="password" type="password" placeholder="Password"></f7-input>
              </f7-list-item>
            </f7-list>
            <f7-list>
              <f7-list-button title="Sign In" close-login-screen></f7-list-button>
              <f7-list-label>
                <p>Click Sign In to close Login Screen</p>
              </f7-list-label>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-login-screen>

  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import VueC3 from 'vue-c3'

import * as api from '@/util/function'
import '@/css/chartist.min.css'
import '@/css/c3.min.css'

const apiServer = {
  bitcoin: {
    url: 'https://api.blockchain.info/charts/market-price?timespan=5weeks&rollingAverage=8hours&format=json&cors=true'
  },
  coindesk_realtime: {
    url: 'https://api.coindesk.com/v1/bpi/currentprice/KRW.json'
  },
  coindesk_history: {
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=KRW&start=2017-11-01&end=2017-12-19'
  }
}

export default {
  data: () => ({
    intervalId: null,
    handler: new Vue(),

    chartData: {
      labels: ["A", "B", "C"],
      series:[[1, 3, 2]]
    },
    chartOptions: {
      lineSmooth: false
    },

    chart: {
      ratio: 'ct-minor-seventh',
      type: 'Line',
      data: {
        labels: ["A", "B", "C"],
        series:[[1, 3, 2]]
      },
      options: [{
        event: 'draw',
        fn: context => {
          context.element.attr({
            style: `stroke: hsl(${Math.floor(this.$chartist.getMultiValue(context.value) / 100 * 100)}, 60%, 50%);`
          })
        }
      }],
    },
  }),
  mounted() {
    console.log(api.unix2date(1510894800, "YYYY-MM-DD HH"))
    this.initChart()
    this.startDrawChart()
  },
  destroyed() {
    this.stopDrawChart()
  },
  created() {
    this.drawChart()
  },
  methods: {
    startDrawChart() {
      this.intervalId = setInterval(this.drawChart, 1000 * 60);
    },
    stopDrawChart() {
      clearInterval(this.intervalId);
    },
    initChart() {
      this.handler.$emit('init', {
        data: {
          x: 'x',
          columns: [],
        },
        axis : {
          x : {
            type : 'timeseries',
            tick: {
              format: '%Y-%m-%d'
            }
          }
        }
      })
    },
    async drawChart () {
      const option = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Max-Age': 3600,
        },
      }

      const convertXY = (url, data) => {
        const server = _.findKey(apiServer, {url: url})
        switch (server) {
          case 'bitcoin':
            this.chart.data.labels = _.takeRight(_.map(data.values, (i) => (api.unix2date(i.x, "MM-DD"))), 20)
            this.chart.data.series = [
              _.takeRight(_.map(data.values, 'y'), 20)
            ]

            return [
              _.concat('x', _.takeRight(_.map(data.values, (i) => (api.unix2date(i.x, "YYYY-MM-DD"))), 30)),
              _.concat('y', _.takeRight(_.map(data.values, 'y'), 30)),
            ]
            break;
          case 'coindesk_realtime':
          case 'coindesk_history':
            break;
          default:
            break;
        }
      }

      api.get(apiServer.bitcoin.url, option)
      .then((res) => (convertXY(apiServer.bitcoin.url, res.data)))
      .then(chartData => {
        this.handler.$emit('dispatch', (chart) => {
          chart.load({
            columns: chartData,
          })
        })
      })
    },
  },
  components :{
    VueC3,
  }
}
</script>

<style>

/* Default Status bar background */
.statusbar-overlay {
    background: pink;
    /* We can add transition for smooth color animation */
    -webkit-transition: 400ms;
    transition: 400ms;
}

/* Change Status bar background when panel opened */
body.with-panel-left-cover .statusbar-overlay {
    background: #222;
}

.empty {
    border-radius: 10px;
    text-align: center;
    text-shadow: 2px 2px black;
    line-height: 450px;
    background: gray;
    color: white;
    font-weight: bold;
    font-size: 40px;
}
</style>
