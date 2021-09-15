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
  const number = 1
  const ops: Op[] = [
    {
      insert: TEXT,
    },
  ]
  const attributes = {
    blockquote: true,
    indent: number,
  }
  const para = new Paragraph(ops, attributes)
  const html = para.toHtml()
  console.log(html)

  t.is(html, `<blockquote class="ql-indent-${number}">${TEXT}</blockquote>`)
})

test('format:header', (t) => {
  const number = 2
  const align = 'center'
  const ops: Op[] = [
    {
      insert: TEXT,
    },
  ]
  const attributes = {
    header: number,
    align,
  }
  const para = new Paragraph(ops, attributes)
  const html = para.toHtml()
  console.log(html)

  t.is(html, `<h${number} class="ql-align-${align}">${TEXT}</h${number}>`)
})

test('format:list + ordered', (t) => {
  const ops: Op[] = [
    {
      insert: TEXT,
    },
  ]
  const attributes = {
    list: 'ordered',
    indent: '2',
    align: 'center',
  }
  const para = new Paragraph(ops, attributes)
  const html = para.toHtml()
  console.log(html)

  t.pass()
})
