<template>
  <f7-page>
    <f7-navbar title="차트" back-link="뒤로" sliding></f7-navbar>

    <f7-block>
      <f7-buttons>
        <f7-button
          :fill="period==='minute' ? true: false"
          @click="period='minute'"
        >분 단위</f7-button>

        <f7-button
          :fill="period==='hour' ? true: false"
          @click="period='hour'"
        >시간 단위</f7-button>

        <f7-button
          @click="period='day'"
          :fill="period==='day' ? true: false"
        >일 단위</f7-button>
      </f7-buttons>
    </f7-block>

    <chart
      :options="options"
      auto-resize
      width="100%"
    ></chart>
  </f7-page>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import api from '@/api/cryptocompare'

import 'echarts'
//import 'echarts/lib/chart/bar'
//import 'echarts/lib/chart/candlestick'
//import 'echarts/lib/component/tooltip'

var upColor = '#00da3c';
var downColor = '#ec0000';

export default {
  data: _ => ({
    period: 'minute',
    rawData: null,
  }),

  async beforeCreate() {
    const {from, to, market} = this.$route.params
    const res = await api.coinHistorical('minute', from, to, market)
    this.rawData = res
  },

  watch: {
    period: async function() {
      console.log('peroid changed!', this.period)
      const {from, to, market} = this.$route.params
      const res = await api.coinHistorical(this.period, from, to, market)
      this.rawData = res
    }
  },

  methods: {
    calculateMA: function(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.length; i < len; i++) {
          if (i < dayCount) {
              result.push('-');
              continue;
          }
          var sum = 0;
          for (var j = 0; j < dayCount; j++) {
              sum += data[i - j][1];
          }
          result.push(sum / dayCount);
      }
      return result;
    },
  },

  computed: {
    data: function() {
      return _.map(this.rawData, function (item) {
        return [+item.open, +item.close, +item.low, +item.high];
      })
    },

    volumes: function () {
      return _.map(this.rawData, function (item) {
        return item.volumeto - item.volumefrom
      })
    },

    dates: function() {
      let format
      switch(this.period) {
        case 'minute':
        case 'hour':
          format = 'HH:mm'
          break;

        case 'day':
        default:
          format = 'MM-DD'
          break;
      }

      return _.map(this.rawData, function (item) {
        return Vue.options.filters.unix2date(item.time, format)
      })
    },

    options: function() {
      return {
        backgroundColor: '#21202D',
        //backgroundColor: '#fff',
        legend: {
          data: ['BTC', 'MA5', 'MA10', 'MA20', 'MA30'],
          inactiveColor: '#777',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false,
            type: 'cross',
            lineStyle: {
              color: '#376df4',
              width: 2,
              opacity: 1
            }
          },
          position: function (pos, params, el, elRect, size) {
            var obj = {top: 10};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          }
        },
        axisPointer: {
          link: {xAxisIndex: 'all'},
          label: {
            backgroundColor: '#777'
          }
        },
        xAxis: [
            {
              type: 'category',
              data: this.dates,
              axisLine: { lineStyle: { color: '#8392A5' } }
            },
            {
              type: 'category',
              gridIndex: 1,
              data: this.dates,
              scale: true,
              boundaryGap : false,
              axisLine: {onZero: false},
              axisTick: {show: false},
              splitLine: {show: false},
              axisLabel: {show: false},
              splitNumber: 20,
              min: 'dataMin',
              max: 'dataMax',
            }
        ],
        //yAxis: {
        //  scale: true,
        //  axisLine: { lineStyle: { color: '#8392A5' } },
        //  splitLine: { show: false }
        //},
        yAxis: [
          {
            scale: true,
            axisLine: { lineStyle: { color: '#8392A5' } },
            splitLine: { show: false }
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
          }
        ],
        grid: [
          {
            left: '80px',
            right: '8%',
            height: '50%',
          },
          {
            left: '80px',
            right: '8%',
            top: '73%',
            height: '16%'
          }
        ],
        dataZoom: [{
          show : true,
          realtime: true,
          start : 75,
          end : 100,
          textStyle: {
            color: '#8392A5'
          },
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          dataBackground: {
            areaStyle: {
              color: '#8392A5'
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5'
            }
          },
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }, {
          type: 'inside'
        }],
        animation: false,
        series: [
          {
            type: 'candlestick',
            name: 'BTC',
            data: this.data,
            itemStyle: {
              normal: {
                color: '#FD1050',
                color0: '#0CF49B',
                borderColor: '#FD1050',
                borderColor0: '#0CF49B'
              }
            }
          },
          {
            name: 'MA5',
            type: 'line',
            data: this.calculateMA(5, this.data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          },
          {
            name: 'MA10',
            type: 'line',
            data: this.calculateMA(10, this.data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          },
          {
            name: 'MA20',
            type: 'line',
            data: this.calculateMA(20, this.data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          },
          {
            name: 'MA30',
            type: 'line',
            data: this.calculateMA(30, this.data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            }
          },
          {
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: this.volumes
          }
        ]
      }
    }
  }
}
</script>

<style>
.echarts {
  width: 100vw;
  min-width: 400px;
}
</style>
