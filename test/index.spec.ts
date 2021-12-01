import test from 'ava'
import { DeltaConverter } from '@src/index'
import { fullFormatsDelta } from './__data__/full-formats'

test('toHtml.full-formats', (t) => {
  const converter = new DeltaConverter()
  const html = converter.toHtml(fullFormatsDelta)
  const expectedHtml = [
    '<p><strong>bold</strong><em>italic</em><u>underline</u><s>strike</s><s><u><em><strong>bius</strong></em></u></s></p>',
    '<p><span class="ql-size-huge">size-huge</span></p>',
    '<h1>header1</h1>',
    '<h2>header2</h2>',
    '<p><span style="color: #e60000;">font-color</span></p>',
    '<p><span style="background-color: #ffff00;">background-color</span></p>',
    '<p>x<sup>2</sup></p>',
    '<p>x<sub>2</sub></p>',
    '<blockquote>blockquote</blockquote>',
    '<ol>',
    '<li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>o1</li>',
    '<li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>o2</li>',
    '<li class="ql-indent-1" data-list="ordered"><span class="ql-ui" contenteditable="false"></span>o2-1</li>',
    '<li class="ql-indent-1" data-list="ordered"><span class="ql-ui" contenteditable="false"></span>o2-2</li>',
    '<li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>o3</li>',
    '<li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>u1</li>',
    '<li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>u2</li>',
    '<li class="ql-indent-1" data-list="bullet"><span class="ql-ui" contenteditable="false"></span>u2-1</li>',
    '<li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>u3</li>',
    '</ol>',
    '<p class="ql-indent-1">indent1</p>',
    '<p class="ql-indent-2">indent2</p>',
    '<p class="ql-align-right ql-direction-rtl">direction-rtl</p>',
    '<p><a href="http://example.com" rel="noopener noreferrer" target="_blank">link</a></p>',
  ].join('')
  t.is(html, expectedHtml)
})

test('toMarkdown.full-formats', (t) => {
  const converter = new DeltaConverter()
  const md = converter.toMarkdown(fullFormatsDelta)
  const expectedMd = [
    '**bold**_italic_<u>underline</u>~~strike<u>_**bius**_</u>~~',
    'size-huge',
    '# header1',
    '## header2',
    'font-color',
    'background-color',
    'x<sup>2</sup>',
    'x<sub>2</sub>',
    '> blockquote',
    '1. o1',
    '1. o2',
    '  1. o2-1',
    '  1. o2-2',
    '1. o3',
    '- u1',
    '- u2',
    '  - u2-1',
    '- u3',
    '  indent1',
    '    indent2',
    'direction-rtl',
    '[link](http://example.com)',
  ].join('\n')
  t.is(md, expectedMd)
})
