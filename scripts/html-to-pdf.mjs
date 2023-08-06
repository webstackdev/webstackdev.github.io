import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { JSDOM } from 'jsdom'
import puppeteer from 'puppeteer'

const htmlPath = resolve('docs/index.html')
const stylePath = resolve('.cache/pdf.css')
const cacheHtmlPath = resolve('.cache/index.html')
const pdfOutputPath = resolve('docs/resume.pdf')

class FileMissingError extends Error {
  constructor(fileName) {
    super(`Missing file ${fileName}`)
    this.name = 'FileMissingError'
  }
}

const preGenerate = async () => {
  const checkExistence = (fileNames) => {
    fileNames.forEach(fileName => {
      if (!existsSync(fileName)) throw new FileMissingError(fileName)
    })
  }
  checkExistence([htmlPath, stylePath])
}

const inlineAssets = () => {
  const html = readFileSync(htmlPath, { encoding: 'utf8' })
  const { document } = new JSDOM(html).window // document.documentElement.outerHTML
  /** Add styles sheets inline */
  const styleElement = document.createElement('style')
  const css = readFileSync(stylePath, { encoding: 'utf8' })
  styleElement.appendChild(document.createTextNode(css))
  document.head.appendChild(styleElement)
  return document.documentElement.outerHTML
}

const generatePdf = async () => {
  // use puppeteer headless mode
  const browser = await puppeteer.launch({
    headless: 'new',
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 794,
    height: 1122,
  })
  await page.setContent(inlineAssets(), {
    waitUntil: 'networkidle0',
  })
  await page.emulateMediaType('print')
  await page.pdf({
    preferCSSPageSize: true,
    printBackground: true,
    path: pdfOutputPath,
  })
  await browser.close()
  console.log(`PDF of resume generated`)
}

await preGenerate()
await generatePdf()
