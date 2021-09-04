import Encoding from 'encoding-japanese'

/**
 * プロパティ値を設定する
 * @param key
 * @param id
 */
export const setPropertyValue = (key: string, id: string): void => {
  PropertiesService.getScriptProperties().setProperty(key, id)
}

/**
 * プロパティ値を取得する
 * @param key
 */
export const getPropertyValue = (key: string): string => {
  return PropertiesService.getScriptProperties().getProperty(key)
}

/**
 * 日付を設定する
 * @param date
 */
export const getDayFormat = (date = new Date()): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month}-${day}`
}

/**
 * CSVを取得する
 * @param data
 */
export const convertCsv = (data: string): Array<unknown | Array<unknown> | any> => {
  return Utilities.parseCsv(data)
}

/**
 * CSVを取得する (文字化け)
 * @param data
 */
// export const convertCsvWithSJIS = (
//   data: string
// ): Array<unknown | Array<unknown> | any> => {
//   return Utilities.parseCsv(Encoding.convert(data, 'SJIS'))
// }
