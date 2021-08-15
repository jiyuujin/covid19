import { NuxtHTTPInstance } from '@nuxt/http'

export class COVID19Repository {
  private readonly http: NuxtHTTPInstance

  constructor($http: NuxtHTTPInstance) {
    this.http = $http
  }

  get(prefecture?: string, prefectureCode?: number) {
    const uri = process.env.NUXT_COVID19_API
    return this.http.$get(
      `${uri!}?prefecture=${prefecture!}&prefecture_code=${prefectureCode}`
    )
  }
}
