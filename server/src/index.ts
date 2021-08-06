import { SheetService } from './services/sheetService'
import { Covid19Service } from '~/services/covid19Service'

import { getDayFormat } from './utils'

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

global.fetchVaccinationSummaryDaily = (): void => {
  Covid19Service.fetchVaccinationSummaryDaily()
}
