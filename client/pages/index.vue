<template>
  <main>
    <div v-if="updatedAt" class="header">
      {{ `${updatedAt} 更新` }}
    </div>

    <h2>参照</h2>
    <h3>
      <a
        href="https://www.mhlw.go.jp/stf/covid-19/open-data.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        新型コロナウイルス感染症について オープンデータ (厚生労働省)
      </a>
    </h3>
    <h3>
      <a
        href="https://www.kantei.go.jp/jp/headline/kansensho/vaccine.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        これまでのワクチン総接種回数 (首相官邸)
      </a>
    </h3>

    <h2>データ</h2>
    <h3 id="positiveTotal" class="subtitle">
      <a href="/#positiveTotal">{{ `検査陽性者数` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `New API` }}
      </span>
    </h3>
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

    <h3 id="testedTotal" class="subtitle">
      <a href="/#testedTotal">{{ `検査実施件数` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `API V1` }}
      </span>
    </h3>
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

    <h3 id="vaccinationTotal" class="subtitle">
      <a href="/#vaccinationTotal">{{ `ワクチン接種数累計` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `API V1` }}
      </span>
    </h3>
    <div class="grid">
      <div class="grid_list">
        <div class="info">
          <div class="info">
            <google-chart
              v-if="vaccinationTotalData.length !== 0"
              chart-type="ColumnChart"
              :chart-data="vaccinationTotalData"
              :chart-options="vaccinationOptions"
              class="chart"
            />
          </div>
        </div>
      </div>
    </div>

    <h3 id="recoveryTotal" class="subtitle">
      <a href="/#recoveryTotal">{{ `退院、療養解除となった者` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `API V1` }}
      </span>
    </h3>
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

    <h3 id="caseTotal" class="subtitle">
      <a href="/#caseTotal">{{ `入院治療を要する者` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `API V1` }}
      </span>
    </h3>
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

    <h3 id="deathTotal" class="subtitle">
      <a href="/#deathTotal">{{ `死亡者数` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `API V1` }}
      </span>
    </h3>
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

    <h3 id="severeTotal" class="subtitle">
      <a href="/#severeTotal">{{ `重症者数` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `API V1` }}
      </span>
    </h3>
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
  vaccinationChartOptions,
  caseChartOptions,
  recoveryChartOptions,
  deathChartOptions,
  severeChartOptions
} from '~/services/chartOptions'
import {
  positiveChartColumns,
  testedChartColumns,
  vaccinationChartColumns,
  caseChartColumns,
  recoveryChartColumns,
  deathChartColumns,
  severeChartColumns
} from '~/services/chartColumns'
import { getPositiveV2Items } from '~/services/covid19'

const GoogleChart = () => import('~/components/GoogleChart.vue')

export default Vue.extend({
  components: {
    GoogleChart
  },
  data() {
    return {
      positiveTotalData: [] as Array<Array<Date | string | number>>,
      testedTotalData: [] as Array<Array<Date | string | number>>,
      vaccinationTotalData: [] as Array<Array<Date | string | number>>,
      caseTotalData: [] as Array<Array<Date | string | number>>,
      recoveryTotalData: [] as Array<Array<Date | string | number>>,
      deathTotalData: [] as Array<Array<Date | string | number>>,
      severeTotalData: [] as Array<Array<Date | string | number>>,
      updatedAt: '' as string,
      positiveTotalOptions: positiveChartOptions,
      testedTotalOptions: testedChartOptions,
      vaccinationOptions: vaccinationChartOptions,
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
        this.positiveTotalData = [
          ...getPositiveV2Items(res, positiveChartColumns)
        ]
        this.testedTotalData = [...this.getV1Items(res, testedChartColumns)]
        this.vaccinationTotalData = [
          ...this.getV1Items(res, vaccinationChartColumns)
        ]
        this.caseTotalData = [...this.getV1Items(res, caseChartColumns)]
        this.recoveryTotalData = [...this.getV1Items(res, recoveryChartColumns)]
        this.deathTotalData = [...this.getV1Items(res, deathChartColumns)]
        this.severeTotalData = [...this.getV1Items(res, severeChartColumns)]
        this.updatedAt = res.updated_at
      })
      .catch((err: any) => {
        console.error(err)
      })
  },
  methods: {
    getV1Items(res: any, columns: string[]) {
      let result: Array<Array<Date | string | number>> = [columns]
      for (const item of res.v1data) {
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
