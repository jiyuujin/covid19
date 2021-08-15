export const getV1Items = (res: any, columns: string[]) => {
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

export const getVaccinationTotalItems = (res: any, columns: string[]) => {
  let result: Array<Array<Date | string | number>> = [columns]
  for (const item of res.vaccinationDateData) {
    let temp: Array<Date | string | number> = []
    for (let key = 0; key < columns.length; key++) {
      if (key === 0) {
        temp.push(new Date(item['date']))
      } else if (key === 1) {
        temp.push(Number(item['total']))
      }
    }
    result.push(temp)
  }
  return result
}

export const getVaccinationDateItems = (res: any, columns: string[]) => {
  let result: Array<Array<Date | string | number>> = [columns]
  for (const item of res.vaccinationDateData) {
    let temp: Array<Date | string | number> = []
    for (let key = 0; key < columns.length; key++) {
      if (key === 0) {
        temp.push(new Date(item['date']))
      } else if (key === 1) {
        temp.push(Number(item['count_first_or_mid_general']))
      } else {
        temp.push(Number(item['count_second_or_full_general']))
      }
    }
    result.push(temp)
  }
  return result
}

export const getVaccinationPrefectureItems = (res: any, columns: string[]) => {
  let result: Array<Array<Date | string | number>> = [columns]
  for (const item of res.vaccinationPrefectureData) {
    let temp: Array<Date | string | number> = []
    for (let key = 0; key < columns.length; key++) {
      if (key === 0) {
        temp.push(new Date(item['date']))
      } else if (key === 1) {
        temp.push(Number(item['count_first_or_mid_general']))
      } else {
        temp.push(Number(item['count_second_or_full_general']))
      }
    }
    result.push(temp)
  }
  return result
}

export const getPositiveV2Items = (res: any, columns: string[]) => {
  let result: Array<Array<Date | string | number>> = [columns]
  for (const item of res.v2PositiveData) {
    let temp: Array<Date | string | number> = []
    for (let key = 0; key < columns.length; key++) {
      if (key === 0) {
        temp.push(new Date(item['Date']))
      } else {
        temp.push(Number(item['Newly confirmed cases']))
      }
    }
    result.push(temp)
  }
  return result
}

export const getCaseV2Items = (
  res: any,
  columns: string[],
  requiredCare: boolean
) => {
  let result: Array<Array<Date | string | number>> = [columns]
  for (const item of res.v2CaseData) {
    let temp: Array<Date | string | number> = []
    for (let key = 0; key < columns.length; key++) {
      if (key === 0) {
        temp.push(new Date(item['Date']))
      } else if (key === 1) {
        if (requiredCare) {
          temp.push(Number(item['Requiring inpatient care']))
        } else {
          temp.push(
            Number(item['Discharged from hospital or released from treatment'])
          )
        }
      }
    }
    result.push(temp)
  }
  return result
}

export const getDeathV2Items = (res: any, columns: string[]) => {
  let result: Array<Array<Date | string | number>> = [columns]
  for (const item of res.v2DeathData) {
    let temp: Array<Date | string | number> = []
    for (let key = 0; key < columns.length; key++) {
      if (key === 0) {
        temp.push(new Date(item['Date']))
      } else if (key === 1) {
        temp.push(Number(item['Deaths(Cumulative)']))
      }
    }
    result.push(temp)
  }
  return result
}

export const getSevereV2Items = (res: any, columns: string[]) => {
  let result: Array<Array<Date | string | number>> = [columns]
  for (const item of res.v2SevereData) {
    let temp: Array<Date | string | number> = []
    for (let key = 0; key < columns.length; key++) {
      if (key === 0) {
        temp.push(new Date(item['Date']))
      } else if (key === 1) {
        temp.push(Number(item['Severe cases']))
      }
    }
    result.push(temp)
  }
  return result
}
