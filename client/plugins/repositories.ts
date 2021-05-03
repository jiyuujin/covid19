import { COVID19Repository } from '~/api/covid19'

export interface Repositories {
  cr: COVID19Repository
}

export default function ({ $http }: any, inject: any) {
  const cr = new COVID19Repository($http)
  const repositories: Repositories = { cr }
  inject('repositories', repositories)
}
