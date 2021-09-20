<template>
  <main>
    <div v-if="updatedAt" class="header">
      {{ `${updatedAt} 更新` }}
    </div>

    <h1>新型コロナウイルス 現況</h1>
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

    <div
      v-if="emergencyDeclarationData.length !== 0"
      class="alert-block alert-block_error"
    >
      <p>緊急事態宣言</p>
      <span v-for="p in emergencyDeclarationData" :key="p">
        <span class="tag" :style="{ marginLeft: '8px' }">
          {{ p }}
        </span>
      </span>
    </div>

    <div
      v-if="preventionDeclarationData.length !== 0"
      class="alert-block alert-block_warning"
    >
      <p>まん延防止等重点措置</p>
      <span v-for="p in preventionDeclarationData" :key="p">
        <span class="tag" :style="{ marginLeft: '8px' }">
          {{ p }}
        </span>
      </span>
    </div>

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
            :chart-options="positiveChartOptions"
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
            :chart-options="testedChartOptions"
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
        <div v-if="vaccinationTotalData.length !== 0" class="info">
          <google-chart
            chart-type="ColumnChart"
            :chart-data="vaccinationTotalData"
            :chart-options="vaccinationChartOptions"
            class="chart"
          />
        </div>
        <loading-svg v-else class="loading" />
      </div>
    </div>

    <h4 id="vaccinationDate" class="subtitle">
      {{ `回数別` }}
    </h4>
    <div v-if="prefecture === 0" class="grid">
      <div class="grid_list">
        <div v-if="vaccinationDateData.length !== 0" class="info">
          <google-chart
            chart-type="ColumnChart"
            :chart-data="vaccinationDateData"
            :chart-options="vaccinationChartOptions"
            class="chart"
          />
        </div>
        <loading-svg v-else class="loading" />
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
            :chart-options="recoveryChartOptions"
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
            :chart-options="caseChartOptions"
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
            :chart-options="deathChartOptions"
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
            :chart-options="severeChartOptions"
            class="chart"
          />
        </div>
        <loading-svg v-else class="loading" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, useContext, onMounted } from '@nuxtjs/composition-api'

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
  vaccinationTotalChartColumns,
  vaccinationDateChartColumns,
  caseChartColumns,
  recoveryChartColumns,
  deathChartColumns,
  severeChartColumns
} from '~/services/chartColumns'
import {
  getEmergencyDeclarationItems,
  getPreventionDeclarationItems,
  getV1Items,
  getVaccinationTotalItems,
  getVaccinationDateItems,
  getVaccinationPrefectureItems,
  getPositiveV2Items,
  getCaseV2Items,
  getDeathV2Items,
  getSevereV2Items
} from '~/services/covid19'
import { prefectures } from '~/services/japan'

import LoadingSvg from '~/static/loading.svg'

const PrefectureSelect = () => import('~/components/PrefectureSelect.vue')
const GoogleChart = () => import('~/components/GoogleChart.vue')

type IData = Array<Array<string | number | Date>> | undefined

export default defineComponent({
  components: {
    LoadingSvg,
    PrefectureSelect,
    GoogleChart
  },
  setup() {
    const { $http } = useContext()
    const emergencyDeclarationData = ref<IData>([])
    const preventionDeclarationData = ref<IData>([])
    const positiveTotalData = ref<IData>([])
    const testedTotalData = ref<IData>([])
    const vaccinationTotalData = ref<IData>([])
    const vaccinationDateData = ref<IData>([])
    const vaccinationPrefectureData = ref<IData>([])
    const caseTotalData = ref<IData>([])
    const recoveryTotalData = ref<IData>([])
    const deathTotalData = ref<IData>([])
    const severeTotalData = ref<IData>([])
    const updatedAt = ref<string>('')
    const prefecture = ref<number>(0)
    const prefectureName = computed(() => {
      return prefectures.filter((p) => p.value === prefecture.value)[0].label
    })
    const handleSelect = (val: number) => {
      prefecture.value = val
    }
    const reset = () => {
      emergencyDeclarationData.value = []
      preventionDeclarationData.value = []
      positiveTotalData.value = []
      testedTotalData.value = []
      vaccinationTotalData.value = []
      vaccinationDateData.value = []
      vaccinationPrefectureData.value = []
      caseTotalData.value = []
      recoveryTotalData.value = []
      deathTotalData.value = []
      severeTotalData.value = []
    }
    const fetchResponse = async (prefecture: string) => {
      const prefectureCode = prefectures.filter((p) => p.text === prefecture)[0].value
      await $http.$get(`${process.env.NUXT_COVID19_API}?prefecture=${prefecture!}&prefecture_code=${prefectureCode}`)
        .then((res: any) => {
          emergencyDeclarationData.value = [...getEmergencyDeclarationItems(res)]
          preventionDeclarationData.value = [
            ...getPreventionDeclarationItems(res)
          ]
          positiveTotalData.value = [
            ...getPositiveV2Items(res, positiveChartColumns)
          ]
          testedTotalData.value = [...getV1Items(res, testedChartColumns)]
          vaccinationTotalData.value = [
            ...getVaccinationTotalItems(res, vaccinationTotalChartColumns)
          ]
          vaccinationDateData.value = [
            ...getVaccinationDateItems(res, vaccinationDateChartColumns)
          ]
          vaccinationPrefectureData.value = [
            ...getVaccinationPrefectureItems(res, vaccinationDateChartColumns)
          ]
          caseTotalData.value = [...getCaseV2Items(res, caseChartColumns, true)]
          recoveryTotalData.value = [
            ...getCaseV2Items(res, recoveryChartColumns, false)
          ]
          deathTotalData.value = [...getDeathV2Items(res, deathChartColumns)]
          severeTotalData.value = [...getSevereV2Items(res, severeChartColumns)]
          updatedAt.value = res.updated_at
        })
        .catch((err: any) => {
          console.error(err)
        })
    }
    watch(
      prefecture,
      async () => {
        reset()
        await fetchResponse(
          prefectures.filter((p) => p.value === prefecture.value)[0].text
        )
      },
    )
    onMounted(async () => {
      await fetchResponse(
        prefectures.filter((p) => p.value === prefecture.value)[0].text
      )
    })
    return {
      positiveChartOptions,
      testedChartOptions,
      vaccinationChartOptions,
      caseChartOptions,
      recoveryChartOptions,
      deathChartOptions,
      severeChartOptions,
      prefectures,
      prefectureName,
      handleSelect,
      emergencyDeclarationData,
      preventionDeclarationData,
      positiveTotalData,
      testedTotalData,
      vaccinationTotalData,
      vaccinationDateData,
      vaccinationPrefectureData,
      caseTotalData,
      recoveryTotalData,
      deathTotalData,
      severeTotalData,
      updatedAt,
      prefecture,
    }
  }
})
</script>
