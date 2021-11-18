import test from 'ava'
import { Op } from '@src/types'
import { Paragraph } from '@src/models/paragraph'

const TEXT = 'Hello World!'

test('paragraph', (t) => {
  const ops: Op[] = [
    {
      insert: TEXT,
    },
    {
      insert: TEXT,
      attributes: { color: 'red' },
    },
  ]
  const para = new Paragraph(ops, { list: 'ordered' })

  t.is(para.children.length, 2)
  t.is(para.ops.length, 2)
  t.is(para.children[0].next, para.children[1])
  t.is(para.children[1].prev, para.children[0])
})
