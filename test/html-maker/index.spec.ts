import test from 'ava'
import { wrap, unwrap, getMatchers } from '@src/html-maker'

test('wrap', (t) => {
  const html = '<span>hello world!</span>'
  const wrapped = wrap(html, 'strong')
  t.is(wrapped, `<strong>${html}</strong>`)
})

test('unwrap', (t) => {
  t.is(unwrap('<span>hello world!</span>'), 'hello world!')
  t.is(unwrap('<span >hello world!</span>'), 'hello world!')
  t.is(unwrap('<span  >hello world!</span>'), 'hello world!')
  t.is(unwrap('<span  >hello world!< /span>'), 'hello world!')
  t.is(unwrap('<span  >hello world!< / span>'), 'hello world!')
  t.is(unwrap('<span  ><b>hello world!</b>< / span>'), '<b>hello world!</b>')
  t.is(
    unwrap('<span  class="hello-test"><b>hello world!</b>< / span>'),
    '<b>hello world!</b>'
  )
  t.is(
    unwrap('<span id="test" class="hello-test"><b>hello world!</b>< / span >'),
    '<b>hello world!</b>'
  )
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
