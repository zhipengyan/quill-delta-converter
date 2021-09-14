import test from 'ava'
import { Op, AttributeMap } from '@src/types'
import { Blot } from '@src/models/blot'
import { getAttribute } from '@src/html-maker'

const TEXT = 'Hello World!'

function commonToHtml(attributes: AttributeMap) {
  const op: Op = {
    insert: TEXT,
    attributes,
  }
  const blot = new Blot(op)
  return blot.toHtml()
}

test('format:bold', (t) => {
  t.is(commonToHtml({ bold: true }), `<b>${TEXT}</b>`)
  t.is(commonToHtml({ bold: false }), TEXT)
})

test('format:italic', (t) => {
  t.is(commonToHtml({ italic: true }), `<i>${TEXT}</i>`)
  t.is(commonToHtml({ italic: false }), TEXT)
})

test('format:underline', (t) => {
  t.is(commonToHtml({ underline: true }), `<u>${TEXT}</u>`)
  t.is(commonToHtml({ underline: false }), TEXT)
})

test('format:strike', (t) => {
  t.is(commonToHtml({ strike: true }), `<s>${TEXT}</s>`)
  t.is(commonToHtml({ underline: false }), TEXT)
})

test('format:BIUS', (t) => {
  t.is(
    commonToHtml({ bold: true, italic: true, underline: true, strike: true }),
    `<s><u><i><b>${TEXT}</b></i></u></s>`
  )
  t.is(
    commonToHtml({ bold: false, italic: true, underline: false, strike: true }),
    `<s><i>${TEXT}</i></s>`
  )
})

test('format:link', (t) => {
  const link = 'https://google.com'
  const html = commonToHtml({ link })
  const className = getAttribute(html, 'class')
  const href = getAttribute(html, 'href')
  t.is(className, 'ql-link')
  t.is(href, link)
})

test('format:link + bold', (t) => {
  const link = 'https://google.com'
  const html = commonToHtml({ link, bold: true })
  const className = getAttribute(html, 'class')
  const href = getAttribute(html, 'href')
  t.is(className, 'ql-link')
  t.is(href, link)
})

test('format:img', (t) => {
  const imgSrc = 'http://i.cdn.com/dog.jpg'
  const op: Op = {
    insert: {
      image: imgSrc,
    },
  }
  const blot = new Blot(op)
  debugger
  t.is(blot.toHtml(), `<img src="${imgSrc}"/>`)
})
