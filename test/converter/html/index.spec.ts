import test from 'ava'
import { HtmlConverter } from '@src/converter/html'
import { getAttribute } from '@src/converter/html/utils'
import { fuzzyEqual } from '../../utils'

const converter = new HtmlConverter()

test('htmlConverter.constructor', (t) => {
  t.is(typeof converter.convert, 'function')
})

test('htmlConverter.plain', (t) => {
  const result = converter.convert('plain text', {})
  t.is(result.html, 'plain text')
})

test('htmlConverter.bold', (t) => {
  const result = converter.convert('text', { bold: true })
  t.is(result.html, '<b>text</b>')
})

test('htmlConverter.italic', (t) => {
  const result = converter.convert('text', { italic: true })
  t.is(result.html, '<i>text</i>')
})

test('htmlConverter.underline', (t) => {
  const result = converter.convert('text', { underline: true })
  t.is(result.html, '<u>text</u>')
})

test('htmlConverter.strike', (t) => {
  const result = converter.convert('text', { strike: true })
  t.is(result.html, '<s>text</s>')
})

test('htmlConverter.link', (t) => {
  const { html } = converter.convert('text', { link: 'http://example.com' })
  t.truthy(
    fuzzyEqual(html, '<a target="_blank" href="http://example.com">text</a>')
  )
})

test('htmlConverter.image', (t) => {
  const { html } = converter.convert(
    { image: 'http://img.example.com' },
    { width: '100', height: '200', alt: 'img' }
  )
  t.truthy(
    fuzzyEqual(
      html,
      '<img height="200" width="100" alt="img" src="http://img.example.com" />'
    )
  )
  t.truthy(
    fuzzyEqual(
      converter.convert({ image: 'http://img.example.com' }).html,
      '<img src="http://img.example.com" />'
    )
  )
})

test('htmlConverter.video', (t) => {
  const { html } = converter.convert({ video: 'http://video.example.com' }) as {
    html: string
  }
  t.is(getAttribute(html, 'src'), 'http://video.example.com')
  t.is(getAttribute(html, 'frameborder'), '0')
  t.is(getAttribute(html, 'allowfullscreen'), 'true')
  t.is(getAttribute(html, 'class'), 'ql-video')

  t.truthy(
    fuzzyEqual(
      html,
      '<iframe class="ql-video" src="http://video.example.com" frameborder="0" allowfullscreen="true"></iframe>'
    )
  )
})

test('htmlConverter.code', (t) => {
  const { html } = converter.convert('inline code', { code: true })
  t.is(html, '<code>inline code</code>')
})

test('htmlConverter.code-block', (t) => {
  const { html, wrapper } = converter.convert('code block', {
    'code-block': true,
  })
  t.truthy(fuzzyEqual(html, '<pre class="ql-code-block">code block</pre>'))
  t.deepEqual(wrapper, {
    tagName: 'div',
    classNames: ['ql-code-block-container'],
  })
})

test('htmlConverter.blockquote', (t) => {
  const { html } = converter.convert('blockquote', { blockquote: true })
  t.is(html, '<blockquote>blockquote</blockquote>')
})

test('htmlConverter.header', (t) => {
  Array.prototype.forEach.call([1, 2, 3, 4, 5, 6], (num: number) => {
    const { html } = converter.convert('header', { header: num })
    t.is(html, `<h${num}>header</h${num}>`)
  })
})

test('htmlConverter.list', (t) => {
  const ordered = converter.convert('list', { list: 'ordered' })
  t.truthy(
    fuzzyEqual(
      ordered.html,
      '<li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>list</li>'
    )
  )
  t.deepEqual(ordered.wrapper, {
    tagName: 'ol',
  })

  const bullet = converter.convert('list', { list: 'bullet' })
  t.truthy(
    fuzzyEqual(
      bullet.html,
      '<li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>list</li>'
    )
  )
  t.deepEqual(bullet.wrapper, {
    tagName: 'ul',
  })

  const checked = converter.convert('list', { list: 'checked' })
  t.truthy(
    fuzzyEqual(
      checked.html,
      '<li data-list="checked"><span class="ql-ui" contenteditable="false"></span>list</li>'
    )
  )
  t.deepEqual(checked.wrapper, {
    tagName: 'ul',
  })

  const unchecked = converter.convert('list', { list: 'unchecked' })
  t.truthy(
    fuzzyEqual(
      unchecked.html,
      '<li data-list="unchecked"><span class="ql-ui" contenteditable="false"></span>list</li>'
    )
  )
  t.deepEqual(unchecked.wrapper, {
    tagName: 'ul',
  })
})
