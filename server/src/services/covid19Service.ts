import { ApiService } from './apiService'
import { SlackService } from './slackService'

import { convertCsv } from '~/utils'

import {
  SPREADSHEET_NAME,
  caseTotalCSV,
  deathTotalCSV,
  positiveCSV,
  recoveryTotalCSV,
  severeTotalCSV,
  testedCSV,
  SLACK_INCOMING_API
} from '~/constants'

const ss = SpreadsheetApp.openById(SPREADSHEET_NAME)
const sheet = ss.getSheetByName('main')

export class Covid19Service {
  /**
   * PCR検査 陽性者数を取得する
   */
  static fetchPCRPositiveDaily() {
    const res = ApiService.getApi(positiveCSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      sheet.getRange(1, 1, items.length, items[0].length).setValues(items)
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `陽性者数を取得しました - ${err}`
        })
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
      for (let index = 0; index < items.length; index++) {
        const textFinder = sheet.createTextFinder(items[index][0])
        const ranges = textFinder.findAll()
        if (ranges[0] != null) {
          const target = ranges[0].getA1Notation().slice(1)
          sheet.getRange(Number(target), 3).setValue(items[index][1])
        }
      }
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `実施人数を取得しました - ${err}`
        })
      )
    }
  }

  /**
   * 入院治療等を要する者の数を取得する
   */
  static fetchPCRCaseTotalDaily() {
    const res = ApiService.getApi(caseTotalCSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      for (let index = 0; index < items.length; index++) {
        const textFinder = sheet.createTextFinder(items[index][0])
        const ranges = textFinder.findAll()
        if (ranges[0] != null) {
          const target = ranges[0].getA1Notation().slice(1)
          sheet.getRange(Number(target), 4).setValue(items[index][1])
        }
      }
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `入院治療等を要する者の数を取得しました - ${err}`
        })
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
      for (let index = 0; index < items.length; index++) {
        const textFinder = sheet.createTextFinder(items[index][0])
        const ranges = textFinder.findAll()
        if (ranges[0] != null) {
          const target = ranges[0].getA1Notation().slice(1)
          sheet.getRange(Number(target), 5).setValue(items[index][1])
        }
      }
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `退院又は療養解除となった者の数を取得しました - ${err}`
        })
      )
    }
  }

  /**
   * 死亡者の数を取得する
   */
  static fetchDeathTotalDaily() {
    const res = ApiService.getApi(deathTotalCSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      for (let index = 0; index < items.length; index++) {
        const textFinder = sheet.createTextFinder(items[index][0])
        const ranges = textFinder.findAll()
        if (ranges != null) {
          const target = ranges[0].getA1Notation().slice(1)
          sheet.getRange(Number(target), 6).setValue(items[index][1])
        }
      }
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `死亡者の数を取得しました - ${err}`
        })
      )
    }
  }

  /**
   * 重症者の数を取得する
   */
  static fetchSevereTotalDaily() {
    const res = ApiService.getApi(severeTotalCSV)
    const resData = res.getContentText()
    const items = convertCsv(resData)

    try {
      for (let index = 0; index < items.length; index++) {
        const textFinder = sheet.createTextFinder(items[index][0])
        const ranges = textFinder.findAll()
        if (ranges[0] != null) {
          const target = ranges[0].getA1Notation().slice(1)
          sheet.getRange(Number(target), 7).setValue(items[index][1])
        }
      }
    } catch (err) {
      SlackService.sendMessage(
        SLACK_INCOMING_API,
        JSON.stringify({
          text: `重症者の数を取得しました - ${err}`
        })
      )
    }
  }
}
