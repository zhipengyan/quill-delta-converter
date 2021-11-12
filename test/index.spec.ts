import test from 'ava'
import { DeltaConverter } from '@src/index'
import Delta from 'quill-delta'

test('first', (t) => {
  const converter = new DeltaConverter()
  const delta = new Delta([
    {
      insert: 'bold',
      attributes: {
        bold: true,
        italic: true,
        color: '#333444',
      },
    },
    {
      insert: '\n',
    },
    {
      insert: 'italic',
      attributes: {
        italic: true,
      },
    },
    {
      insert: '\n',
    },
  ])
  const html = converter.toHtml(delta)
  t.is(html, '<p><b>bold</b><i>hello</i></p>')
  t.pass()
})
