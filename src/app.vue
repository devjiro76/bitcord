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
          <f7-nav-center sliding>비트코드</f7-nav-center>
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
              <f7-nav-center sliding>비트코드</f7-nav-center>
              <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="right"></f7-link>
              </f7-nav-right>
            </f7-navbar>

            <!-- Page Content -->
            <f7-block-title>비트코드</f7-block-title>
            <f7-block inner>
              <p>비트코드는 다양한 해외 API를 통해 수집된 정보로 가장 빠르고 정확한 정보를 실시간으로 제공합니다. 직관적인 현재 가격을 다양한 환율로 제공하고, 트레이딩 뷰를 통해 깊이있는 차트를 이용할 수 있습니다.</p>
            </f7-block>

            <div>
              <FavoriteList></FavoriteList>
              <f7-button @click="addFavorite1">상품추가 테스트1</f7-button>
              <f7-button @click="addFavorite2">상품추가 테스트2</f7-button>
            </div>


            <f7-block inner>
              <!--VueC3 :handler="handler"></VueC3-->
              <chartist
                id-chart="ct-chart"
                :ratio="chart.ratio"
                :type="chart.type"
                :data="chart.data"
                :options="chart.options"
                :event-handlers="chart.eventHandlers"
              ></chartist>
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

import FavoriteList from '@/components/FavoriteList'

import { api } from '@/util/function'
import '@/css/chartist.min.css'

export default {
  data: () => ({

    chart: {
      ratio: 'ct-minor-seventh',
      type: 'Line',
      data: {
        labels: ["A", "B", "C"],
        series:[[1, 3, 2]]
      },
      options: {
        axisX: {
          scaleMinSpace: 120,
          //labelInterpolationFnc: function(value) {
          //  return unix2date(value, "MM-DD")
          //},
          //labelInterpolationFnc: function(value, index) {
          //  return index % 2 === 0 ? unix2date(value, "MM-DD") : null;
          //},
        },
        axisY: {
          offset: 60,
          onlyInteger: true,
          //labelInterpolationFnc: function(value) {
          //  return Vue.options.filters.thousand(value)
          //},
          scaleMinSpace: 15,
        }
      },
      eventHandlers: [{
        event: 'draw',
        fn: (context) => {
          context.element.attr({
            style: `stroke: hsl(${Math.floor(Vue.chartist.getMultiValue(context.value) / 100 * 100)}, 60%, 50%);`
          })
        }
      }],
    },
  }),

  props: {},

  mounted() {
    //this.$setItem('myName','ChoiJH')
    //.then(res => { console.log(res) })
    
    this.$getItem('myName')
    .then(res => console.log('get', res))
  },

  destroyed() {
    this.clearAllIntervals()
  },

  methods: {
    addFavorite1() {
      this.$store.dispatch('add_favorite', {
        favId: 3,
        from: 'ETH',
        to: 'BTC',
        market: 'CCCAGG'
      })
    },

    addFavorite2() {
      this.$store.dispatch('add_favorite', {
        favId: 4,
        from: 'LTC',
        to: 'USD',
        market: 'CCCAGG'
      })
    },

    async drawChart () {
      const convertXY = (url, data) => {
        const server = _.findKey(apiServer, {url: url})
        switch (server) {
          case 'bitcoin':
            //return data.values
            return {
              labels: _.takeRight(_.map(data.values, 'x'), 20),
              series: [ _.takeRight(_.map(data.values, 'y'), 20) ],
            }
            break;
          case 'coindesk_realtime':
          case 'coindesk_history':
            break;
          default:
            break;
        }
      }

      await api.get(apiServer.bitcoin.url)
      .then((res) => (convertXY(apiServer.bitcoin.url, res.data)))
      .then(chartData => { this.chart.data = chartData })
    },
  },

  components :{
    FavoriteList,
  },
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
