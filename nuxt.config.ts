import { generalOg, twitterOg } from './client/utils/og.constants'

const sass = require('sass')
const fiber = require('fibers')

require('dotenv').config()

export default {
  srcDir: 'client',

  head: {
    title: 'top',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      ...generalOg(),
      ...twitterOg()
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [
    {
      src: '~/assets/main.scss',
      lang: 'css'
    }
  ],

  components: true,

  plugins: ['~/plugins/repositories'],

  buildModules: ['@nuxt/typescript-build'],

  modules: ['@nuxt/http', '@nuxtjs/pwa', 'nuxt-svg-loader'],

  build: {
    babel: {
      plugins: [
        [
          '@babel/plugin-proposal-private-methods',
          {
            loose: true
          }
        ]
      ]
    },
    loaders: {
      scss: {
        implementation: sass,
        sassOptions: {
          fiber
        }
      }
    }
  },

  env: {
    NUXT_COVID19_API: process.env.NUXT_COVID19_API
  }
}
