import Delta from 'quill-delta'

export const fullFormatsDelta = new Delta([
  {
    attributes: {
      bold: true,
    },
    insert: 'bold',
  },
  {
    attributes: {
      italic: true,
    },
    insert: 'italic',
  },
  {
    attributes: {
      underline: true,
    },
    insert: 'underline',
  },
  {
    attributes: {
      strike: true,
    },
    insert: 'strike',
  },
  {
    attributes: {
      underline: true,
      strike: true,
      italic: true,
      bold: true,
    },
    insert: 'bius',
  },
  {
    insert: '\n',
  },
  {
    attributes: {
      size: 'huge',
    },
    insert: 'size-huge',
  },
  {
    insert: '\nheader1',
  },
  {
    attributes: {
      header: 1,
    },
    insert: '\n',
  },
  {
    insert: 'header2',
  },
  {
    attributes: {
      header: 2,
    },
    insert: '\n',
  },
  {
    attributes: {
      color: '#e60000',
    },
    insert: 'font-color',
  },
  {
    insert: '\n',
  },
  {
    attributes: {
      background: '#ffff00',
    },
    insert: 'background-color',
  },
  {
    insert: '\nx',
  },
  {
    attributes: {
      script: 'super',
    },
    insert: '2',
  },
  {
    insert: '\nx',
  },
  {
    attributes: {
      script: 'sub',
    },
    insert: '2',
  },
  {
    insert: '\nblockquote',
  },
  {
    attributes: {
      blockquote: true,
    },
    insert: '\n',
  },
  {
    insert: 'o1',
  },
  {
    attributes: {
      list: 'ordered',
    },
    insert: '\n',
  },
  {
    insert: 'o2',
  },
  {
    attributes: {
      list: 'ordered',
    },
    insert: '\n',
  },
  {
    insert: 'o2-1',
  },
  {
    attributes: {
      indent: 1,
      list: 'ordered',
    },
    insert: '\n',
  },
  {
    insert: 'o2-2',
  },
  {
    attributes: {
      indent: 1,
      list: 'ordered',
    },
    insert: '\n',
  },
  {
    insert: 'o3',
  },
  {
    attributes: {
      list: 'ordered',
    },
    insert: '\n',
  },
  {
    insert: 'u1',
  },
  {
    attributes: {
      list: 'bullet',
    },
    insert: '\n',
  },
  {
    insert: 'u2',
  },
  {
    attributes: {
      list: 'bullet',
    },
    insert: '\n',
  },
  {
    insert: 'u2-1',
  },
  {
    attributes: {
      indent: 1,
      list: 'bullet',
    },
    insert: '\n',
  },
  {
    insert: 'u3',
  },
  {
    attributes: {
      list: 'bullet',
    },
    insert: '\n',
  },
  {
    insert: 'indent1',
  },
  {
    attributes: {
      indent: 1,
    },
    insert: '\n',
  },
  {
    insert: 'indent2',
  },
  {
    attributes: {
      indent: 2,
    },
    insert: '\n',
  },
  {
    insert: 'direction-rtl',
  },
  {
    attributes: {
      align: 'right',
      direction: 'rtl',
    },
    insert: '\n',
  },
  {
    attributes: {
      link: 'http://example.com',
    },
    insert: 'link',
  },
  {
    insert: '\n',
  },
  {
    attributes: {
      table: 'true',
    },
    insert: '\n',
  },
])
