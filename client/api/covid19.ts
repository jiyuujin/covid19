import { NuxtHTTPInstance } from '@nuxt/http'

export class COVID19Repository {
  private readonly http: NuxtHTTPInstance

  constructor($http: NuxtHTTPInstance) {
    this.http = $http
  }

  get() {
    const uri = process.env.NUXT_COVID19_API
    return this.http.$get(uri!)
  }
}
