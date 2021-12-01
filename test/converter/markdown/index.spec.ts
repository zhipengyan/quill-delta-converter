import test from 'ava'
import { MarkdownConverter } from '@src/converter/markdown'

const mdConverter = new MarkdownConverter()

test('markdownConverter.constructor', (t) => {
  t.is(typeof mdConverter.convert, 'function')
  t.truthy(mdConverter instanceof MarkdownConverter)
})

test('markdownConverter.plain', (t) => {
  const md = mdConverter.convert('text')
  t.is(md, 'text')
})

test('markdownConverter.bold', (t) => {
  const md = mdConverter.convert('bold', { bold: true })
  t.is(md, '**bold**')
})

test('markdownConverter.italic', (t) => {
  const md = mdConverter.convert('italic', { italic: true })
  t.is(md, '_italic_')
})

test('markdownConverter.underline', (t) => {
  const md = mdConverter.convert('underline', { underline: true })
  t.is(md, '<u>underline</u>')
})

test('markdownConverter.strike', (t) => {
  const md = mdConverter.convert('strike', { strike: true })
  t.is(md, '~~strike~~')
})

test('markdownConverter.link', (t) => {
  const md = mdConverter.convert('link', { link: 'http://example.com' })
  t.is(md, '[link](http://example.com)')
})

test('markdownConverter.image', (t) => {
  const md = mdConverter.convert(
    { image: 'http://img.example.com/i.png' },
    { alt: 'img-placeholder' }
  )
  t.is(md, '![img-placeholder](http://img.example.com/i.png)')
})

test('markdownConverter.video', (t) => {
  const md = mdConverter.convert(
    { video: 'http://video.example.com/v.avi' },
    { width: '100', height: '200' }
  )
  t.is(
    md,
    '<iframe src="http://video.example.com/v.avi" frameborder="0" allowfullscreen="true" height="200" width="100" />'
  )
})

test('markdownConverter.code', (t) => {
  const md = mdConverter.convert('inline code', { code: true })
  t.is(md, '`inline code`')
})

test('markdownConverter.code-block', (t) => {
  const md = mdConverter.convert("let name = 'Jack';", {
    'code-block': 'javascript',
  })
  t.is(md, "let name = 'Jack';")
})

test('markdownConverter.blockquote', (t) => {
  const md = mdConverter.convert('blockquote', { blockquote: true })
  t.is(md, '> blockquote')
})

test('markdownConverter.header', (t) => {
  Array.prototype.forEach.call([1, 2, 3, 4, 5, 6], (num: number) => {
    const md = mdConverter.convert(`header${num}`, { header: num })
    t.is(
      md,
      `${Array.from({ length: num })
        .map(() => '#')
        .join('')} header${num}`
    )
  })
})

test('markdownConverter.list', (t) => {
  t.is(mdConverter.convert('ordered', { list: 'ordered' }), '1. ordered')
  t.is(mdConverter.convert('bullet', { list: 'bullet' }), '- bullet')
  t.is(mdConverter.convert('checked', { list: 'checked' }), '- [x] checked')
  t.is(
    mdConverter.convert('unchecked', { list: 'unchecked' }),
    '- [ ] unchecked'
  )
})

test('markdownConverter.align', (t) => {
  t.is(mdConverter.convert('align', { align: 'right' }), 'align')
})

test('markdownConverter.background', (t) => {
  t.is(
    mdConverter.convert('background', { background: '#ff00ff' }),
    'background'
  )
})

test('markdownConverter.color', (t) => {
  t.is(mdConverter.convert('color', { color: '#ff00ff' }), 'color')
})

test('markdownConverter.direction', (t) => {
  t.is(mdConverter.convert('direction', { direction: 'rtl' }), 'direction')
})

test('markdownConverter.font', (t) => {
  t.is(mdConverter.convert('font', { font: 'sofia' }), 'font')
})

test('markdownConverter.size', (t) => {
  t.is(mdConverter.convert('size', { size: 'large' }), 'size')
})

test('markdownConverter.indent', (t) => {
  Array.prototype.forEach.call([1, 2, 3, 4, 5, 6], (indent: number) => {
    t.is(
      mdConverter.convert('indent', { indent }),
      `${Array.from({ length: indent })
        .map(() => '  ')
        .join('')}indent`
    )
  })
})
