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
