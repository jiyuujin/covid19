import Endpoints from './endpoint.constants'

export const generalOg = (title?: string, description?: string, url?: string) => [
  {
    hid: 'description',
    name: 'description',
    content: description
      ? description
      : '厚生労働省や首相官邸のオープンデータを利用して、新型コロナウイルスの現況を可視化しています。',
  },
  {
    hid: 'og:site_name',
    name: 'og:site_name',
    content: title ? title : '新型コロナウイルスの現況',
  },
  {
    hid: 'og:type',
    name: 'og:type',
    content: 'website',
  },
  {
    hid: 'og:description',
    name: 'og:description',
    content: description
      ? description
      : '厚生労働省や首相官邸のオープンデータを利用して、新型コロナウイルスの現況を可視化しています。',
  },
  {
    hid: 'og:title',
    name: 'og:title',
    content: title ? title : '新型コロナウイルスの現況',
  },
  {
    hid: 'og:url',
    name: 'og:url',
    content: url ? url : 'https://webneko.dev/',
  },
  {
    hid: 'og:image',
    name: 'og:image',
    content: `${Endpoints.DOMAIN}/top.jpg`,
  },
]

export const twitterOg = (title?: string, description?: string) => [
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content: description
      ? description
      : '厚生労働省や首相官邸のオープンデータを利用して、新型コロナウイルスの現況を可視化しています。',
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: title ? title : '新型コロナウイルスの現況',
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image', // ex: summary, summary_large_image
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: '@jiyuujinlab',
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: '@jiyuujinlab',
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: '@jiyuujinlab',
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: `${Endpoints.DOMAIN}/top.jpg`,
  },
]
