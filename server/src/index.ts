import { SheetService } from './services/sheetService'
import { Covid19Service } from '~/services/covid19Service'

import { getDayFormat } from './utils'

declare let global: any

global.createNewSpreadsheet = (): void => {
  const title = `New File ${getDayFormat()}`
  SheetService.createNewFile(title)
}

global.fetchPCRPositiveDaily = (): void => {
  Covid19Service.fetchPCRPositiveDaily()
}

global.fetchPCRTestedDaily = (): void => {
  Covid19Service.fetchPCRTestedDaily()
}

global.fetchPCRCaseTotalDaily = (): void => {
  Covid19Service.fetchPCRCaseTotalDaily()
}

global.fetchPCRRecoveryTotalDaily = (): void => {
  Covid19Service.fetchPCRRecoveryTotalDaily()
}

global.fetchDeathTotalDaily = (): void => {
  Covid19Service.fetchDeathTotalDaily()
}

global.fetchSevereTotalDaily = (): void => {
  Covid19Service.fetchSevereTotalDaily()
}
