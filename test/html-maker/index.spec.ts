import test from 'ava'
import { register, getMatchers, makeHtml } from '@src/html-maker'

test('register', (t) => {
  const matcherName = 'test12122121212'
  let matchers = getMatchers([matcherName])
  t.assert(matchers.length === 0)
  register({
    [matcherName]: {
      tagName: 'span',
      classNames: 'ql-test',
    },
  })
  matchers = getMatchers([matcherName])
  t.is(matchers[0]?.name, matcherName)
})

test('getMatchers', (t) => {
  t.deepEqual(
    getMatchers(['blockquote', 'indent']).map((m) => m.name),
    ['blockquote', 'indent']
  )
  t.deepEqual(
    getMatchers(['indent', 'blockquote']).map((m) => m.name),
    ['blockquote', 'indent']
  )
  t.deepEqual(
    getMatchers(['size', 'bold']).map((m) => m.name),
    ['bold', 'size']
  )
})

test('makeHtml', (t) => {
  const html = makeHtml({
    matcher: {
      tagName: 'b',
      attributes(_value, attributes) {
        return attributes
      },
    },
    html: 'hello',
    attributes: {
      role: 'text',
    },
  })
  t.is(html, '<b role="text">hello</b>')

  const html1 = makeHtml({
    matcher: {
      tagName() {
        return 'i'
      },
      classNames: ['cls1', 'cls2'],
    },
    html: '<span>hello</span>',
  })
  t.is(html1, '<i class="cls1 cls2"><span>hello</span></i>')

  const html2 = makeHtml({
    matcher: {
      create(value) {
        return `<input type="checkbox"${value ? ' checked="checked"' : ''} />`
      },
      classNames: 'cls',
    },
    value: true,
  })
  t.is(html2, '<input class="cls" type="checkbox" checked="checked" />')
})
