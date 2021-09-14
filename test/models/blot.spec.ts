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
  const href = getAttribute(html, 'href')
  t.is(href, link)
})

test('format:link + bold', (t) => {
  const link = 'https://google.com'
  const html = commonToHtml({ link, bold: true })
  const href = getAttribute(html, 'href')
  t.is(href, link)
  t.is(getAttribute(html, 'target'), '_blank')
})

test('format:img', (t) => {
  const imgSrc = 'http://i.cdn.com/dog.jpg'
  const op: Op = {
    insert: {
      image: imgSrc,
    },
  }
  const blot = new Blot(op)
  t.is(blot.toHtml(), `<img src="${imgSrc}"/>`)
})

test('format:img + attributes', (t) => {
  const imageSrc = 'http://i.cdn.com/dog.jpg'
  const op: Op = {
    insert: {
      image: imageSrc,
    },
    attributes: {
      width: 272,
      height: 92,
      alt: '',
    },
  }
  const blot = new Blot(op)
  const html = blot.toHtml()
  t.is(getAttribute(html, 'src'), imageSrc)
  t.is(getAttribute(html, 'width'), '272')
  t.is(getAttribute(html, 'height'), '92')
})

test('format:video', (t) => {
  const videoSrc = 'https://player.vimeo.com/video/253905163'
  const op: Op = {
    insert: {
      video: videoSrc,
    },
  }
  const blot = new Blot(op)
  t.is(
    blot.toHtml(),
    `<iframe allowfullscreen="true" frameborder="0" src="${videoSrc}" class="ql-video"></iframe>`
  )
})

test('format:video + attribute', (t) => {
  const videoSrc = 'https://player.vimeo.com/video/253905163'
  const op: Op = {
    insert: {
      video: videoSrc,
    },
    attributes: {
      width: 500,
      height: 280,
    },
  }
  const blot = new Blot(op)
  const html = blot.toHtml()
  t.is(getAttribute(html, 'src'), videoSrc)
  t.is(getAttribute(html, 'width'), '500')
  t.is(getAttribute(html, 'height'), '280')
  t.is(getAttribute(html, 'class'), 'ql-video')
})
