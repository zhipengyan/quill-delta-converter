import test from 'ava'
import {
  register,
  isTextNode,
  wrap,
  unwrap,
  getMatchers,
  getAttribute,
  removeAttribute,
  setAttribute,
  setAttributes,
  isSelfClose,
  makeHtml,
} from '@src/html-maker'

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

test('isTextNode', (t) => {
  const text = 'hello, world'
  t.truthy(isTextNode(text))
  const html = '<span>hello, world</span>'
  t.falsy(isTextNode(html))
})

test('getAttribute', (t) => {
  t.is(getAttribute('hello, world', 'src'), null)
  t.is(getAttribute('<span>hello</span>', 'class'), null)
  t.is(getAttribute('<span class="">hello</span>', 'class'), '')
  t.is(getAttribute('<span class="text">hello</span>', 'class'), 'text')
  t.is(getAttribute('<span class="text"></span>', 'class'), 'text')
  t.is(getAttribute('<span  class="text">hello</span>', 'class'), 'text')
  t.is(
    getAttribute('<span class="text bold">hello</span>', 'class'),
    'text bold'
  )
  t.is(getAttribute('<img src="./img.jpg" />', 'src'), './img.jpg')

  t.is(getAttribute("<span class=''>hello</span>", 'class'), '')
  t.is(getAttribute("<span class='text'>hello</span>", 'class'), 'text')
  t.is(getAttribute("<span  class='text'>hello</span>", 'class'), 'text')
  t.is(
    getAttribute("<span class='text bold'>hello</span>", 'class'),
    'text bold'
  )
  t.is(getAttribute("<img src='./img.jpg' />", 'src'), './img.jpg')
})

test('removeAttribute', (t) => {
  t.is(removeAttribute('hello, world', 'src'), 'hello, world')
  t.is(removeAttribute('<span>hello</span>', 'class'), '<span>hello</span>')
  t.is(
    removeAttribute('<span class="">hello</span>', 'class'),
    '<span>hello</span>'
  )
  t.is(
    removeAttribute('<span class="text">hello</span>', 'class'),
    '<span>hello</span>'
  )
  t.is(
    removeAttribute('<span  class="text">hello</span>', 'class'),
    '<span >hello</span>'
  )
  t.is(
    removeAttribute('<span class="text bold">hello</span>', 'class'),
    '<span>hello</span>'
  )
  t.is(removeAttribute('<img src="./img.jpg" />', 'src'), '<img />')

  t.is(
    removeAttribute("<span class=''>hello</span>", 'class'),
    '<span>hello</span>'
  )
  t.is(
    removeAttribute("<span class='text'>hello</span>", 'class'),
    '<span>hello</span>'
  )
  t.is(
    removeAttribute("<span  class='text'>hello</span>", 'class'),
    '<span >hello</span>'
  )
  t.is(
    removeAttribute("<span class='text bold'>hello</span>", 'class'),
    '<span>hello</span>'
  )
  t.is(removeAttribute("<img src='./img.jpg' />", 'src'), '<img />')
})

test('setAttribute', (t) => {
  t.is(
    setAttribute('hello', 'class', 'text'),
    '<span class="text">hello</span>'
  )
  t.is(
    setAttribute('<span>hello</span>', 'class', 'text'),
    '<span class="text">hello</span>'
  )
  t.is(
    setAttribute('<span >hello</span>', 'class', 'text'),
    '<span class="text" >hello</span>'
  )
  t.is(
    setAttribute('<span class="">hello</span>', 'class', 'text'),
    '<span class="text">hello</span>'
  )
  t.is(
    setAttribute('<img class="dark"/>', 'class', 'text'),
    '<img class="text"/>'
  )
})

test('setAttributes', (t) => {
  t.is(
    setAttributes('hello', { style: 'display: inline-block', class: 'text' }),
    '<span class="text" style="display: inline-block">hello</span>'
  )
})

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

test('isSelfClose', (t) => {
  t.truthy(isSelfClose('img'))
  t.falsy(isSelfClose('span'))
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
