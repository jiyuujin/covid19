import { getPropertyValue } from '~/utils'

export const SLACK_INCOMING_API = getPropertyValue('SLACK_INCOMING_API')
export const SPREADSHEET_NAME = getPropertyValue('SPREADSHEET_NAME')
export const positiveV1CSV =
  'https://www.mhlw.go.jp/content/pcr_positive_daily.csv'
export const positiveV2CSV =
  'https://covid19.mhlw.go.jp/public/opendata/newly_confirmed_cases_daily.csv'
export const testedCSV = 'https://www.mhlw.go.jp/content/pcr_tested_daily.csv'
export const caseTotalV1CSV = 'https://www.mhlw.go.jp/content/cases_total.csv'
export const caseTotalV2CSV =
  'https://covid19.mhlw.go.jp/public/opendata/requiring_inpatient_care_etc_daily.csv'
export const recoveryTotalCSV =
  'https://www.mhlw.go.jp/content/recovery_total.csv'
export const deathTotalV1CSV = 'https://www.mhlw.go.jp/content/death_total.csv'
export const deathTotalV2CSV =
  'https://covid19.mhlw.go.jp/public/opendata/deaths_cumulative_daily.csv'
export const severeTotalCSV = 'https://www.mhlw.go.jp/content/severe_daily.csv'
export const vaccinationSummaryCSV =
  'https://vrs-data.cio.go.jp/vaccination/opendata/latest/summary_by_date.csv'
