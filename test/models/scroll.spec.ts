import test from 'ava'
import Delta from 'quill-delta'
import { Scroll } from '@src/models/scroll'
import { Paragraph } from '@src/models/paragraph'
import { Blot } from '@src/models/blot'

test('scroll', (t) => {
  const scroll = new Scroll(
    new Delta([
      { insert: 'HelloWorld' },
      { insert: '\n', attributes: { header: 1 } },
      { insert: 'Second line\n' },
    ])
  )
  t.assert(
    scroll instanceof Scroll &&
      scroll.children[0] instanceof Paragraph &&
      scroll.children[0].children[0] instanceof Blot
  )
  t.is(scroll.children.length, 2)
  t.is(scroll.children[0].next, scroll.children[1])
  t.is(scroll.children[1].prev, scroll.children[0])
})
