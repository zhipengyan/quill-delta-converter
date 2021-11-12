import test from 'ava'
import { ATTRIBUTES } from '@src/converter/html/attributes'

test('attributes.align', (t) => {
  Array.prototype.forEach.call(['left', 'center', 'right'], (value: string) => {
    t.deepEqual(
      ATTRIBUTES.align({
        attributes: {
          align: value,
        },
        content: '',
      }),
      {
        classNames: [`ql-align-${value}`],
      }
    )
  })
})

test('attributes.background', (t) => {
  t.deepEqual(
    ATTRIBUTES.background({ attributes: { background: 'red' }, content: '' }),
    {
      attributes: {
        style: 'background-color: red;',
      },
    }
  )
})

test('attributes.color', (t) => {
  t.deepEqual(ATTRIBUTES.color({ attributes: { color: 'red' }, content: '' }), {
    attributes: {
      style: 'color: red;',
    },
  })
})

test('attributes.direction', (t) => {
  t.deepEqual(
    ATTRIBUTES.direction({
      attributes: {
        direction: 'rtl',
      },
      content: '',
    }),
    {
      classNames: ['ql-direction-rtl'],
    }
  )
})

test('attributes.font', (t) => {
  t.deepEqual(
    ATTRIBUTES.font({
      attributes: {
        font: 'sofia',
      },
      content: '',
    }),
    {
      classNames: ['ql-font-sofia'],
    }
  )
})

test('attributes.size', (t) => {
  t.deepEqual(
    ATTRIBUTES.size({
      attributes: {
        size: 'small',
      },
      content: '',
    }),
    {
      classNames: ['ql-size-small'],
    }
  )
})

test('attributes.indent', (t) => {
  t.deepEqual(
    ATTRIBUTES.indent({
      attributes: {
        indent: 2,
      },
      content: '',
    }),
    {
      classNames: ['ql-indent-2'],
    }
  )
})
