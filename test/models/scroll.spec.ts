import test from 'ava'
import Delta from 'quill-delta'
import { Scroll } from '@src/models/scroll'
import { Paragraph } from '@src/models/paragraph'
import { Blot } from '@src/models/blot'

test('scroll constructor', (t) => {
  const scroll = new Scroll(new Delta([{ insert: 'HelloWorld\n' }]))
  t.assert(
    scroll instanceof Scroll &&
      scroll.children[0] instanceof Paragraph &&
      scroll.children[0].children[0] instanceof Blot
  )
})

test('scroll.toHtml', (t) => {
  const scroll = new Scroll(
    new Delta([{ insert: 'HelloWorld\n', attributes: { bold: true } }])
  )
  t.is(scroll.toHtml(), '<p><b>HelloWorld</b></p>')
})
