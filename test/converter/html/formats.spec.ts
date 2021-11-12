import test from 'ava'
import { FORMATS } from '@src/converter/html/formats'

test('formats.bius', (t) => {
  t.deepEqual(FORMATS.bold(), { tagName: 'b' })
  t.deepEqual(FORMATS.italic(), { tagName: 'i' })
  t.deepEqual(FORMATS.underline(), { tagName: 'u' })
  t.deepEqual(FORMATS.strike(), { tagName: 's' })
})

test('formats.link', (t) => {
  t.deepEqual(
    FORMATS.link({
      attributes: { link: 'https://example.com' },
      content: 'example',
    }),
    {
      tagName: 'a',
      attributes: {
        href: 'https://example.com',
        target: '_blank',
      },
    }
  )
})

test('formats.image', (t) => {
  const attributes = {
    width: '100',
    height: '200',
    alt: 'img',
  }

  t.deepEqual(
    FORMATS.image({
      attributes,
      content: {
        image: 'https://img.example.com/avatar.png',
      },
    }),
    {
      tagName: 'img',
      attributes: {
        ...attributes,
        src: 'https://img.example.com/avatar.png',
      },
    }
  )
})

test('formats.video', (t) => {
  const attributes = {
    height: '100',
    width: '200',
  }

  t.deepEqual(
    FORMATS.video({
      attributes,
      content: {
        video: 'https://video.example.com',
      },
    }),
    {
      tagName: 'iframe',
      attributes: {
        ...attributes,
        src: 'https://video.example.com',
        frameborder: '0',
        allowfullscreen: 'true',
      },
      classNames: ['ql-video'],
    }
  )
})

test('formats.code', (t) => {
  t.deepEqual(FORMATS.code({ content: 'let a = 123;' }), { tagName: 'code' })
})

test('formats.code-block', (t) => {
  t.deepEqual(FORMATS['code-block']({ content: 'let a = 123;' }), {
    tagName: 'pre',
    classNames: ['ql-code-block'],
    wrapper: {
      tagName: 'div',
      classNames: ['ql-code-block-container'],
    },
  })
})

test('formats.blockquote', (t) => {
  t.deepEqual(FORMATS.blockquote(), {
    tagName: 'blockquote',
  })
})

test('formats.header', (t) => {
  for (let i = 1; i < 7; i++) {
    t.deepEqual(FORMATS.header({ attributes: { header: i }, content: '' }), {
      tagName: `h${i}`,
    })
  }
})

test('formats.list', (t) => {
  t.deepEqual(
    FORMATS.list({
      attributes: {
        list: 'ordered',
      },
      content: 'list1',
    }),
    {
      innerHtml: `<span class="ql-ui" contenteditable="false"></span>list1`,
      tagName: 'li',
      attributes: {
        'data-list': 'ordered',
      },
      wrapper: {
        tagName: 'ol',
      },
    }
  )

  t.deepEqual(
    FORMATS.list({
      attributes: {
        list: 'bullet',
      },
      content: 'list1',
    }),
    {
      innerHtml: `<span class="ql-ui" contenteditable="false"></span>list1`,
      tagName: 'li',
      attributes: {
        'data-list': 'bullet',
      },
      wrapper: {
        tagName: 'ul',
      },
    }
  )

  t.deepEqual(
    FORMATS.list({
      attributes: {
        list: 'checked',
      },
      content: 'list1',
    }),
    {
      innerHtml: `<span class="ql-ui" contenteditable="false"></span>list1`,
      tagName: 'li',
      attributes: {
        'data-list': 'checked',
      },
      wrapper: {
        tagName: 'ul',
      },
    }
  )
})
