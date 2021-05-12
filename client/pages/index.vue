<template>
  <main>
    <div v-if="updatedAt" class="header">
      {{ `${updatedAt} 更新` }}
    </div>

    <h2>データ</h2>
    <h3>検査陽性者数</h3>
    <div class="grid">
      <div class="grid_list">
        <div class="info">
          <google-chart
            v-if="positiveTotalData.length !== 0"
            chart-type="ColumnChart"
            :chart-data="positiveTotalData"
            :chart-options="positiveTotalOptions"
            class="chart"
          />
        </div>
      </div>
    </div>

    <h3>検査実施件数</h3>
    <div class="grid">
      <div class="grid_list">
        <div class="info">
          <google-chart
            v-if="testedTotalData.length !== 0"
            chart-type="ColumnChart"
            :chart-data="testedTotalData"
            :chart-options="testedTotalOptions"
            class="chart"
          />
        </div>
      </div>
    </div>

    <h3>退院、療養解除となった者</h3>
    <div class="grid">
      <div class="grid_list">
        <div class="info">
          <google-chart
            v-if="recoveryTotalData.length !== 0"
            chart-type="ColumnChart"
            :chart-data="recoveryTotalData"
            :chart-options="recoveryTotalOptions"
            class="chart"
          />
        </div>
      </div>
    </div>

    <h3>入院治療を要する者</h3>
    <div class="grid">
      <div class="grid_list">
        <div class="info">
          <google-chart
            v-if="caseTotalData.length !== 0"
            chart-type="ColumnChart"
            :chart-data="caseTotalData"
            :chart-options="caseTotalOptions"
            class="chart"
          />
        </div>
      </div>
    </div>

    <h3>死亡者数</h3>
    <div class="grid">
      <div class="grid_list">
        <div class="info">
          <google-chart
            v-if="deathTotalData.length !== 0"
            chart-type="ColumnChart"
            :chart-data="deathTotalData"
            :chart-options="deathTotalOptions"
            class="chart"
          />
        </div>
      </div>
    </div>

    <h3>重傷者数</h3>
    <div class="grid">
      <div class="grid_list">
        <div class="info">
          <google-chart
            v-if="severeTotalData.length !== 0"
            chart-type="ColumnChart"
            :chart-data="severeTotalData"
            :chart-options="severeTotalOptions"
            class="chart"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import {
  positiveChartOptions,
  testedChartOptions,
  caseChartOptions,
  recoveryChartOptions,
  deathChartOptions,
  severeChartOptions
} from '~/services/chartOptions'
import {
  positiveChartColumns,
  testedChartColumns,
  caseChartColumns,
  recoveryChartColumns,
  deathChartColumns,
  severeChartColumns
} from '~/services/chartColumns'

const GoogleChart = () => import('~/components/GoogleChart.vue')

export default Vue.extend({
  components: {
    GoogleChart
  },
  data() {
    return {
      positiveTotalData: [] as Array<Array<Date | string | number>>,
      testedTotalData: [] as Array<Array<Date | string | number>>,
      caseTotalData: [] as Array<Array<Date | string | number>>,
      recoveryTotalData: [] as Array<Array<Date | string | number>>,
      deathTotalData: [] as Array<Array<Date | string | number>>,
      severeTotalData: [] as Array<Array<Date | string | number>>,
      updatedAt: '' as string,
      positiveTotalOptions: positiveChartOptions,
      testedTotalOptions: testedChartOptions,
      caseTotalOptions: caseChartOptions,
      recoveryTotalOptions: recoveryChartOptions,
      deathTotalOptions: deathChartOptions,
      severeTotalOptions: severeChartOptions
    }
  },
  async mounted() {
    await this.$repositories.cr
      .get()
      .then((res: any) => {
        console.log(res)
        this.positiveTotalData = [...this.getItems(res, positiveChartColumns)]
        this.testedTotalData = [...this.getItems(res, testedChartColumns)]
        this.caseTotalData = [...this.getItems(res, caseChartColumns)]
        this.recoveryTotalData = [...this.getItems(res, recoveryChartColumns)]
        this.deathTotalData = [...this.getItems(res, deathChartColumns)]
        this.severeTotalData = [...this.getItems(res, severeChartColumns)]
        this.updatedAt = res.updated_at
      })
      .catch((err: any) => {
        console.error(err)
      })
  },
  methods: {
    getItems(res: any, columns: string[]) {
      let result: Array<Array<Date | string | number>> = [columns]
      for (const item of res.data) {
        let temp: Array<Date | string | number> = []
        for (let key = 0; key < columns.length; key++) {
          if (key === 0) {
            temp.push(new Date(item[columns[key]]))
          } else {
            temp.push(Number(item[columns[key]]))
          }
        }
        result.push(temp)
      }
      return result
    }
  }
})
</script>
