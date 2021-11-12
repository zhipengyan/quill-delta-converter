import type {
  AttributeMap,
  Config,
  ConvertOptions,
  HtmlConvertResult,
} from '../../types'
import { ATTRIBUTES } from './attributes'
import { FORMATS } from './formats'
import { isSelfClose, setAttribute, getAttribute } from './utils'
import { BaseConverter } from '../base'

export class HtmlConverter extends BaseConverter {
  constructor(config?: Config['html']) {
    super(config)
    this.formatMethods = {
      ...FORMATS,
      ...config?.formats,
    }
    this.attributeMethods = {
      ...ATTRIBUTES,
      ...config?.attributes,
    }
    this.orderInDefault = [...Object.keys(FORMATS), ...Object.keys(ATTRIBUTES)]
  }

  convertResultToHtml(innerHtml: string, rt: HtmlConvertResult) {
    let html = rt.innerHtml ?? innerHtml
    if (rt.tagName) {
      if (isSelfClose(rt.tagName)) {
        html = `<${rt.tagName} />`
      } else {
        html = `<${rt.tagName}>${html}</${rt.tagName}>`
      }
    }
    if (rt.classNames) {
      let cls = getAttribute(html, 'class') || ''
      cls = `${cls} ${rt.classNames.join(' ')}`.trim()
      html = setAttribute(html, 'class', cls)
    }
    if (rt.attributes) {
      html = Object.keys(rt.attributes).reduce((html, attr) => {
        if (
          typeof rt.attributes[attr] === 'undefined' ||
          rt.attributes[attr] === null
        ) {
          return html
        }
        if (attr === 'style') {
          const styl = getAttribute(html, 'style') || ''
          return setAttribute(html, 'style', styl + rt.attributes.style)
        }
        return setAttribute(html, attr, rt.attributes[attr])
      }, html)
    }
    return html
  }

  // getMethod
  convert(content?: string | Record<string, any>, attributes?: AttributeMap) {
    const names = Object.keys(attributes || {})
    if (typeof content === 'object') {
      names.push(...Object.keys(content))
    }
    let wrapper: HtmlConvertResult
    const html = Array.prototype.reduce.call(
      this.getConvertMethods(names),
      (
        content: string | Record<string, any>,
        convert: (options?: ConvertOptions) => HtmlConvertResult
      ) => {
        const rt = convert({
          content,
          attributes,
        })
        if (typeof rt === 'string') {
          return rt
        }
        const innerHtml = rt.innerHtml
          ? rt.innerHtml
          : typeof content === 'string'
          ? content
          : ''
        if (rt.wrapper) {
          wrapper = rt.wrapper
        }
        return this.convertResultToHtml(innerHtml, rt)
      },
      content
    )

    return { html, wrapper }
  }
}
