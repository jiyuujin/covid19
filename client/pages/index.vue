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
    <h3 class="subtitle">
      {{ `都道府県` }}
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `New API` }}
      </span>
    </h3>
    <prefecture-select
      :options="prefectures"
      :values="prefecture"
      @handle-select="handleSelect"
    />
    <h3 id="positiveTotal" class="subtitle">
      <a href="/#positiveTotal">{{ `検査陽性者数` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `New API` }}
      </span>
    </h3>
    <div class="grid">
      <div class="grid_list">
        <div v-if="positiveTotalData.length !== 0" class="info">
          <google-chart
            chart-type="ColumnChart"
            :chart-data="positiveTotalData"
            :chart-options="positiveTotalOptions"
            class="chart"
          />
        </div>
        <loading-svg v-else class="loading" />
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
        <div v-if="testedTotalData.length !== 0" class="info">
          <google-chart
            chart-type="ColumnChart"
            :chart-data="testedTotalData"
            :chart-options="testedTotalOptions"
            class="chart"
          />
        </div>
        <loading-svg v-else class="loading" />
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
          <div v-if="vaccinationTotalData.length !== 0" class="info">
            <google-chart
              chart-type="ColumnChart"
              :chart-data="vaccinationTotalData"
              :chart-options="vaccinationOptions"
              class="chart"
            />
          </div>
          <loading-svg v-else class="loading" />
        </div>
      </div>
    </div>

    <h3 id="recoveryTotal" class="subtitle">
      <a href="/#recoveryTotal">{{ `退院、療養解除となった者` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `New API` }}
      </span>
    </h3>
    <div class="grid">
      <div class="grid_list">
        <div v-if="recoveryTotalData.length !== 0" class="info">
          <google-chart
            chart-type="ColumnChart"
            :chart-data="recoveryTotalData"
            :chart-options="recoveryTotalOptions"
            class="chart"
          />
        </div>
        <loading-svg v-else class="loading" />
      </div>
    </div>

    <h3 id="caseTotal" class="subtitle">
      <a href="/#caseTotal">{{ `入院治療を要する者` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `New API` }}
      </span>
    </h3>
    <div class="grid">
      <div class="grid_list">
        <div v-if="caseTotalData.length !== 0" class="info">
          <google-chart
            chart-type="ColumnChart"
            :chart-data="caseTotalData"
            :chart-options="caseTotalOptions"
            class="chart"
          />
        </div>
        <loading-svg v-else class="loading" />
      </div>
    </div>

    <h3 id="deathTotal" class="subtitle">
      <a href="/#deathTotal">{{ `死亡者数` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `New API` }}
      </span>
    </h3>
    <div class="grid">
      <div class="grid_list">
        <div v-if="deathTotalData.length !== 0" class="info">
          <google-chart
            chart-type="ColumnChart"
            :chart-data="deathTotalData"
            :chart-options="deathTotalOptions"
            class="chart"
          />
        </div>
        <loading-svg v-else class="loading" />
      </div>
    </div>

    <h3 id="severeTotal" class="subtitle">
      <a href="/#severeTotal">{{ `重症者数` }}</a>
      <span class="tag" :style="{ marginLeft: '8px' }">
        {{ `New API` }}
      </span>
    </h3>
    <div class="grid">
      <div class="grid_list">
        <div v-if="severeTotalData.length !== 0" class="info">
          <google-chart
            chart-type="ColumnChart"
            :chart-data="severeTotalData"
            :chart-options="severeTotalOptions"
            class="chart"
          />
        </div>
        <loading-svg v-else class="loading" />
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
import {
  getV1Items,
  getPositiveV2Items,
  getCaseV2Items,
  getDeathV2Items,
  getSevereV2Items
} from '~/services/covid19'
import { prefectures } from '~/services/japan'

import LoadingSvg from '~/static/loading.svg'

const GoogleChart = () => import('~/components/GoogleChart.vue')

export default Vue.extend({
  components: {
    LoadingSvg,
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
      prefecture: 0 as number,
      positiveTotalOptions: positiveChartOptions,
      testedTotalOptions: testedChartOptions,
      vaccinationOptions: vaccinationChartOptions,
      caseTotalOptions: caseChartOptions,
      recoveryTotalOptions: recoveryChartOptions,
      deathTotalOptions: deathChartOptions,
      severeTotalOptions: severeChartOptions,
      prefectures: prefectures
    }
  },
  watch: {
    async prefecture() {
      this.reset()
      await this.fetchResponse(
        this.prefectures.filter((p) => p.value === this.prefecture)[0].text
      )
    }
  },
  async mounted() {
    await this.fetchResponse(
      this.prefectures.filter((p) => p.value === this.prefecture)[0].text
    )
  },
  methods: {
    handleSelect(val: number) {
      this.prefecture = val
    },
    reset() {
      this.positiveTotalData = []
      this.testedTotalData = []
      this.vaccinationTotalData = []
      this.caseTotalData = []
      this.recoveryTotalData = []
      this.deathTotalData = []
      this.severeTotalData = []
    },
    async fetchResponse(prefecture: string) {
      await this.$repositories.cr
        .get(prefecture)
        .then((res: any) => {
          this.positiveTotalData = [
            ...getPositiveV2Items(res, positiveChartColumns)
          ]
          this.testedTotalData = [...getV1Items(res, testedChartColumns)]
          this.vaccinationTotalData = [
            ...getV1Items(res, vaccinationChartColumns)
          ]
          this.caseTotalData = [...getCaseV2Items(res, caseChartColumns, true)]
          this.recoveryTotalData = [
            ...getCaseV2Items(res, recoveryChartColumns, false)
          ]
          this.deathTotalData = [...getDeathV2Items(res, deathChartColumns)]
          this.severeTotalData = [...getSevereV2Items(res, severeChartColumns)]
          this.updatedAt = res.updated_at
        })
        .catch((err: any) => {
          console.error(err)
        })
    }
  }
})
</script>
