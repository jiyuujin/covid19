import { ApiService } from './apiService'
import { SlackService } from './slackService'

import { convertCsv } from '~/utils'

import {
  SPREADSHEET_NAME,
  caseTotalV1CSV,
  caseTotalV2CSV,
  deathTotalV1CSV,
  deathTotalV2CSV,
  positiveV1CSV,
  positiveV2CSV,
  recoveryTotalCSV,
  severeTotalV1CSV,
  severeTotalV2CSV,
  testedCSV,
  SLACK_INCOMING_API,
} from '~/constants'

const ss = SpreadsheetApp.openById(SPREADSHEET_NAME)
const sheetV1 = ss.getSheetByName('v1_main')
const sheetPositiveV2 = ss.getSheetByName('v2_positive_main')
const sheetCaseV2 = ss.getSheetByName('v2_case_main')
const sheetDeathV2 = ss.getSheetByName('v2_death_main')
const sheetSevereV2 = ss.getSheetByName('v2_severe_main')

export class Covid19Service {
  /**
   * PCR検査 陽性者数 (V1) を取得する
   */
  static fetchPCRPositiveDailyV1() {
    const res = ApiService.getApi(positiveV1CSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      sheetV1.getRange(1, 1, items.length, items[0].length).setValues(items)
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `陽性者数 (V1) を取得しました - ${err}`,
        }),
      )
    }
  }

  /**
   * PCR検査 陽性者数 (V2) を取得する
   */
  static fetchPCRPositiveDailyV2() {
    const res = ApiService.getApi(positiveV2CSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      sheetPositiveV2.getRange(1, 1, items.length, items[0].length).setValues(items)
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `陽性者数 (V2) を取得しました - ${err}`,
        }),
      )
    }
  }

  /**
   * PCR検査 実施人数を取得する
   */
  static fetchPCRTestedDaily() {
    const res = ApiService.getApi(testedCSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      for (let index = 0; index < 30; index++) {
        const startDate = sheetV1.getRange(1 + index, 1).getValue()
        if (
          new Date(startDate).getFullYear() === new Date(items[1][0]).getFullYear() &&
          new Date(startDate).getMonth() + 1 === new Date(items[1][0]).getMonth() + 1 &&
          new Date(startDate).getDate() === new Date(items[1][0]).getDate()
        ) {
          const mapItems = items.map((item, key) => {
            if (key === 0) {
              return [null]
            }
            return [item[1]]
          })
          sheetV1
            .getRange(1 + index - 1, 3, mapItems.length, mapItems[0].length)
            .setValues(mapItems)
          break
        }
      }
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `実施人数を取得しました - ${err}`,
        }),
      )
    }
  }

  /**
   * 入院治療等を要する者の数 (V1) を取得する
   */
  static fetchPCRCaseTotalDailyV1() {
    const res = ApiService.getApi(caseTotalV1CSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      for (let index = 0; index < 30; index++) {
        const startDate = sheetV1.getRange(1 + index, 1).getValue()
        if (
          new Date(startDate).getFullYear() === new Date(items[1][0]).getFullYear() &&
          new Date(startDate).getMonth() + 1 === new Date(items[1][0]).getMonth() + 1 &&
          new Date(startDate).getDate() === new Date(items[1][0]).getDate()
        ) {
          const mapItems = items.map((item, key) => {
            if (key === 0) {
              return [null]
            }
            return [item[1]]
          })
          sheetV1
            .getRange(1 + index - 1, 4, mapItems.length, mapItems[0].length)
            .setValues(mapItems)
          break
        }
      }
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `入院治療等を要する者の数を取得しました - ${err}`,
        }),
      )
    }
  }

  /**
   * 入院治療等を要する者の数 (V2) を取得する
   */
  static fetchPCRCaseTotalDailyV2() {
    const res = ApiService.getApi(caseTotalV2CSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      sheetCaseV2.getRange(1, 1, items.length, items[0].length).setValues(items)
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `入院治療等を要する者の数 (V2) を取得しました - ${err}`,
        }),
      )
    }
  }

  /**
   * 退院又は療養解除となった者の数を取得する
   */
  static fetchPCRRecoveryTotalDaily() {
    const res = ApiService.getApi(recoveryTotalCSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      for (let index = 0; index < 30; index++) {
        const startDate = sheetV1.getRange(1 + index, 1).getValue()
        if (
          new Date(startDate).getFullYear() === new Date(items[1][0]).getFullYear() &&
          new Date(startDate).getMonth() + 1 === new Date(items[1][0]).getMonth() + 1 &&
          new Date(startDate).getDate() === new Date(items[1][0]).getDate()
        ) {
          const mapItems = items.map((item, key) => {
            if (key === 0) {
              return [null]
            }
            return [item[1]]
          })
          sheetV1
            .getRange(1 + index - 1, 5, mapItems.length, mapItems[0].length)
            .setValues(mapItems)
          break
        }
      }
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `退院又は療養解除となった者の数を取得しました - ${err}`,
        }),
      )
    }
  }

  /**
   * 死亡者の数 (V1) を取得する
   */
  static fetchDeathTotalDailyV1() {
    const res = ApiService.getApi(deathTotalV1CSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      for (let index = 0; index < 40; index++) {
        const startDate = sheetV1.getRange(1 + index, 1).getValue()
        if (
          new Date(startDate).getFullYear() === new Date(items[1][0]).getFullYear() &&
          new Date(startDate).getMonth() + 1 === new Date(items[1][0]).getMonth() + 1 &&
          new Date(startDate).getDate() === new Date(items[1][0]).getDate()
        ) {
          const mapItems = items.map((item, key) => {
            if (key === 0) {
              return [null]
            }
            return [item[1]]
          })
          sheetV1
            .getRange(1 + index - 1, 6, mapItems.length, mapItems[0].length)
            .setValues(mapItems)
          break
        }
      }
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `死亡者の数を取得しました - ${err}`,
        }),
      )
    }
  }

  /**
   * 死亡者の数 (V2) を取得する
   */
  static fetchDeathTotalDailyV2() {
    const res = ApiService.getApi(deathTotalV2CSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      sheetDeathV2.getRange(1, 1, items.length, items[0].length).setValues(items)
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `死亡者の数 (V2) を取得しました - ${err}`,
        }),
      )
    }
  }

  /**
   * 重症者の数を取得する
   */
  static fetchSevereTotalDailyV1() {
    const res = ApiService.getApi(severeTotalV1CSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      for (let index = 0; index < 30; index++) {
        const startDate = sheetV1.getRange(1 + index, 1).getValue()
        if (
          new Date(startDate).getFullYear() === new Date(items[1][0]).getFullYear() &&
          new Date(startDate).getMonth() + 1 === new Date(items[1][0]).getMonth() + 1 &&
          new Date(startDate).getDate() === new Date(items[1][0]).getDate()
        ) {
          const mapItems = items.map((item, key) => {
            if (key === 0) {
              return [null]
            }
            return [item[1]]
          })
          sheetV1
            .getRange(1 + index - 1, 7, mapItems.length, mapItems[0].length)
            .setValues(mapItems)
          break
        }
      }
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `重症者の数を取得しました - ${err}`,
        }),
      )
    }
  }

  /**
   * 重症者の数 (V2) を取得する
   */
  static fetchSevereTotalDailyV2() {
    const res = ApiService.getApi(severeTotalV2CSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      sheetSevereV2.getRange(1, 1, items.length, items[0].length).setValues(items)
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `重症者の数 (V2) を取得しました - ${err}`,
        }),
      )
    }
  }
}
