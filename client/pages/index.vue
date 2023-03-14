<template>
  <div>
    <div class="g-header">
      <div class="header-left">
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
        <div v-if="emergencyDeclarationData.length !== 0" class="alert-block alert-block_error">
          <p>緊急事態宣言</p>
          <span v-for="p in emergencyDeclarationData" :key="p">
            <span class="tag" :style="{ marginLeft: '8px' }">
              {{ p }}
            </span>
          </span>
        </div>

        <div v-if="preventionDeclarationData.length !== 0" class="alert-block alert-block_warning">
          <p>まん延防止等重点措置</p>
          <span v-for="p in preventionDeclarationData" :key="p">
            <span class="tag" :style="{ marginLeft: '8px' }">
              {{ p }}
            </span>
          </span>
        </div>
      </div>
      <div class="header-right">
        <span v-if="updatedAt">{{ updatedAt }}</span>
        {{ `更新` }}
        <prefecture-select
          :options="prefectures"
          :values="prefecture"
          @handle-select="handleSelect"
        />
      </div>
    </div>

    <div class="g-grid">
      <div id="positiveTotal" class="grid">
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
      <div id="testedTotal" class="grid">
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
    </div>
    <div class="g-grid">
      <div id="severeTotal" class="grid">
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
      <div id="recoveryTotal" class="grid">
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
    </div>
    <div class="g-grid">
      <div id="caseTotal" class="grid">
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
      <div id="deathTotal" class="grid">
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, useContext, onMounted } from '@nuxtjs/composition-api'

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
import {
  getEmergencyDeclarationItems,
  getPreventionDeclarationItems,
  getV1Items,
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
      caseTotalData.value = []
      recoveryTotalData.value = []
      deathTotalData.value = []
      severeTotalData.value = []
    }
    const fetchResponse = async (prefecture: string) => {
      const prefectureText = prefectures.filter((p) => p.text === prefecture)[0].text
      await $http.$get(process.env.NUXT_COVID19_API!)
        .then((res: any) => {
          emergencyDeclarationData.value = [...getEmergencyDeclarationItems(res)]
          preventionDeclarationData.value = [
            ...getPreventionDeclarationItems(res)
          ]
          positiveTotalData.value = [
            ...getPositiveV2Items(res, positiveChartColumns, prefectureText)
          ]
          testedTotalData.value = [...getV1Items(res, testedChartColumns)]
          caseTotalData.value = [...getCaseV2Items(res, caseChartColumns, true, prefectureText)]
          recoveryTotalData.value = [
            ...getCaseV2Items(res, recoveryChartColumns, false, prefectureText)
          ]
          deathTotalData.value = [...getDeathV2Items(res, deathChartColumns, prefectureText)]
          severeTotalData.value = [...getSevereV2Items(res, severeChartColumns, prefectureText)]
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
