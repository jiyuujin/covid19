declare module '*.vue' {
  import { Repositories } from '~/plugins/repositories'

  module 'vue/types/vue' {
    interface Vue {
      $repositories: Repositories
    }
  }
}

declare module '*.svg' {
  const content
  export default content
}
