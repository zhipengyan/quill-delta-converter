import test from 'ava'
import { Op, AttributeMap } from '@src/types'
import { Paragraph } from '@src/models/Paragraph'
import { getAttribute } from '@src/html-maker'

const TEXT = 'Hello World!'

test('format:code-block', (t) => {
  const ops: Op[] = [
    {
      insert: TEXT,
    },
  ]
  const attributes = {
    'code-block': true,
  }
  const para = new Paragraph(ops, attributes)
  const html = para.toHtml()
  console.log(html)

  t.pass()
})

test('format:blockquote', (t) => {
  const ops: Op[] = [
    {
      insert: TEXT,
    },
  ]
  const attributes = {
    blockquote: true,
    // indent: '1',
  }
  const para = new Paragraph(ops, attributes)
  const html = para.toHtml()
  console.log(html)

  t.is(html, `<blockquote>${TEXT}</blockquote>`)
})

test('format:header', (t) => {
  const ops: Op[] = [
    {
      insert: TEXT,
    },
  ]
  const attributes = {
    header: 1,
  }
  const para = new Paragraph(ops, attributes)
  const html = para.toHtml()
  console.log(html)

  t.pass()
})

test('format:list + ordered', (t) => {
  debugger
  const ops: Op[] = [
    {
      insert: TEXT,
    },
  ]
  const attributes = {
    list: 'ordered',
  }
  const para = new Paragraph(ops, attributes)
  const html = para.toHtml()
  console.log(html)

  t.pass()
})
