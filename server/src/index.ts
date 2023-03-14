import { SheetService } from './services/sheetService'
import { Covid19Service } from '~/services/covid19Service'
import { CollectionService } from '~/services/collectionService'

import { getDayFormat } from './utils'

const SHEET_ID = '1u5J3qblwoSjNl7KT3QyQa7R3lCAqfGctszZFUIYbozw'

declare let global: any

global.createNewSpreadsheet = (): void => {
  const title = `New File ${getDayFormat()}`
  SheetService.createNewFile(title)
}

global.fetchPCRPositiveDailyV1 = (): void => {
  Covid19Service.fetchPCRPositiveDailyV1()
}

global.fetchPCRPositiveDailyV2 = (): void => {
  Covid19Service.fetchPCRPositiveDailyV2()
}

global.fetchPCRTestedDaily = (): void => {
  Covid19Service.fetchPCRTestedDaily()
}

global.fetchPCRCaseTotalDailyV1 = (): void => {
  Covid19Service.fetchPCRCaseTotalDailyV1()
}

global.fetchPCRCaseTotalDailyV2 = (): void => {
  Covid19Service.fetchPCRCaseTotalDailyV2()
}

global.fetchPCRRecoveryTotalDaily = (): void => {
  Covid19Service.fetchPCRRecoveryTotalDaily()
}

global.fetchDeathTotalDailyV1 = (): void => {
  Covid19Service.fetchDeathTotalDailyV1()
}

global.fetchDeathTotalDailyV2 = (): void => {
  Covid19Service.fetchDeathTotalDailyV2()
}

global.fetchSevereTotalDailyV1 = (): void => {
  Covid19Service.fetchSevereTotalDailyV1()
}

global.fetchSevereTotalDailyV2 = (): void => {
  Covid19Service.fetchSevereTotalDailyV2()
}

global.doGet = (e): any => {
  const now = new Date()

  const v1data = CollectionService.getData(SHEET_ID, 'v1_main')
  const declarationData = CollectionService.getData(SHEET_ID, 'declaration_main')
  const v2PositiveData = CollectionService.getData(SHEET_ID, 'v2_positive_main')
  const v2CaseData = CollectionService.getData(SHEET_ID, 'v2_case_main')
  const v2DeathData = CollectionService.getData(SHEET_ID, 'v2_death_main')
  const v2SevereData = CollectionService.getData(SHEET_ID, 'v2_severe_main')
  const prefectureData = CollectionService.getData(SHEET_ID, 'prefecture')
  const updatedAt = Utilities.formatDate(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 30),
    'JST',
    'yyyy/MM/dd HH:mm',
  )

  const out = ContentService.createTextOutput(
    JSON.stringify(
      {
        //data: data,
        v1data: v1data,
        declarationData: declarationData,
        v2PositiveData: v2PositiveData,
        v2CaseData: v2CaseData,
        v2DeathData: v2DeathData,
        v2SevereData: v2SevereData,
        prefecture: prefectureData,
        updated_at: updatedAt,
      },
      null,
      2,
    ),
  ).setMimeType(ContentService.MimeType.JSON)
  out.setContent(
    JSON.stringify(
      {
        //data: data,
        v1data: v1data,
        declarationData: declarationData,
        v2PositiveData: v2PositiveData,
        v2CaseData: v2CaseData,
        v2DeathData: v2DeathData,
        v2SevereData: v2SevereData,
        prefecture: prefectureData,
        updated_at: updatedAt,
      },
      null,
      2,
    ),
  ) // JSONPテキストをセット
  return out
}
