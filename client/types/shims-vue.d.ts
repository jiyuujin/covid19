declare module '*.vue' {
  import { Repositories } from '~/plugins/repositories'

  module 'vue/types/vue' {
    interface Vue {
      $repositories: Repositories
    }
  }
}
