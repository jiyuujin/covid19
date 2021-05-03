<template>
  <div :style="{ width: '100%', overflowX: 'scroll' }">
    <GChart
      :type="chartType"
      :data="chartData"
      :options="chartOptions"
      :style="{ width: '900px', height: '300px' }"
    />
  </div>
</template>

<script>
import Vue from 'vue'

import { GChart } from 'vue-google-charts'

export default Vue.extend({
  components: {
    GChart
  },
  props: {
    chartType: {
      type: String,
      default: ''
    },
    chartData: {
      type: Array,
      default: () => {
        return []
      }
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
})
</script>
