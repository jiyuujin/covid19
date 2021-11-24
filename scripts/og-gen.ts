const puppeteer = require('puppeteer')
const path = require('path')

// import fs from 'fs'

const OG_SOURCE_DIR_PATH = path.join(__dirname, '..', 'data')
const OG_SOURCE_HTML_FILE_PATH = path.join(OG_SOURCE_DIR_PATH, 'og.html')
const OG_DIR_PATH = path.join(__dirname, '..', 'client', 'static')

async function captureOgImage(
  browser: any,
  url = '',
  title = '',
  description = '',
  imagePath: string,
) {
  const page = await browser.newPage()
  await page.setViewport({
    width: 1200,
    height: 630,
  })
  if (url) {
    await page.goto(url)
  } else {
    await page.goto('file://' + OG_SOURCE_HTML_FILE_PATH)
    await page.exposeFunction('getTitle', () => title)
    await page.exposeFunction('getDescription', () => description)
  }
  await page.reload()
  await page.screenshot({
    path: imagePath,
    type: 'jpeg',
  })
  await page.close()
}

;(async function () {
  const browser = await puppeteer.launch()

  const ogList = [
    {
      slug: 'top',
      url: '',
      title: 'STOP COVID19',
      description: 'Current situation about COVID19 in Japan.',
    },
  ]

  for (const { slug, url, title, description } of ogList) {
    const OG_IMAGE_FILE_PATH = `${OG_DIR_PATH}/` + slug + '.jpg'
    await captureOgImage(browser, url, title, description, OG_IMAGE_FILE_PATH)
  }

  await browser.close()
})()
