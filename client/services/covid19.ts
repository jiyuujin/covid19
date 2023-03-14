export const getEmergencyDeclarationItems = (res: any) => {
  let result: Array<Array<Date | string | number>> = []
  for (const item of res.declarationData) {
    if (item['emergency_flag'] === 'true') {
      result.push(item['prefecture_name'])
    }
  }
  return result
}

export const getPreventionDeclarationItems = (res: any) => {
  let result: Array<Array<Date | string | number>> = []
  for (const item of res.declarationData) {
    if (item['prevention_flag'] === 'true') {
      result.push(item['prefecture_name'])
    }
  }
  return result
}

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

export const getPositiveV2Items = (res: any, columns: string[], prefectureText: string) => {
  let result: Array<Array<Date | string | number>> = [columns]
  for (const item of res.v2PositiveData) {
    let temp: Array<Date | string | number> = []
    for (let key = 0; key < columns.length; key++) {
      if (key === 0) {
        temp.push(new Date(item['Date']))
      } else {
        temp.push(Number(item[prefectureText]))
      }
    }
    result.push(temp)
  }
  return result
}

export const getCaseV2Items = (
  res: any,
  columns: string[],
  requiredCare: boolean,
  prefectureText: string,
) => {
  let result: Array<Array<Date | string | number>> = [columns]
  for (const item of res.v2CaseData) {
    let temp: Array<Date | string | number> = []
    for (let key = 0; key < columns.length; key++) {
      if (key === 0) {
        temp.push(new Date(item['Date']))
      } else if (key === 1) {
        if (requiredCare) {
          temp.push(Number(item['(ALL) Requiring inpatient care']))
        } else {
          temp.push(
            Number(item[`(${prefectureText}) Discharged from hospital or released from treatment`]),
          )
        }
      }
    }
    result.push(temp)
  }
  return result
}

export const getDeathV2Items = (res: any, columns: string[], prefectureText: string) => {
  let result: Array<Array<Date | string | number>> = [columns]
  for (const item of res.v2DeathData) {
    let temp: Array<Date | string | number> = []
    for (let key = 0; key < columns.length; key++) {
      if (key === 0) {
        temp.push(new Date(item['Date']))
      } else if (key === 1) {
        temp.push(Number(item[prefectureText]))
      }
    }
    result.push(temp)
  }
  return result
}

export const getSevereV2Items = (res: any, columns: string[], prefectureText: string) => {
  let result: Array<Array<Date | string | number>> = [columns]
  for (const item of res.v2SevereData) {
    let temp: Array<Date | string | number> = []
    for (let key = 0; key < columns.length; key++) {
      if (key === 0) {
        temp.push(new Date(item['Date']))
      } else if (key === 1) {
        temp.push(Number(item[prefectureText]))
      }
    }
    result.push(temp)
  }
  return result
}
