import type { Delta, Config, HtmlConvertResult } from './types'
import { HtmlConverter } from './converter/html'
import { Scroll } from './models/scroll'
import isEqual from 'deep-equal'
import escaptHtml from 'escape-html'
import {isTextOp} from './utils'

export class DeltaConverter {
  public htmlConverter: HtmlConverter
  constructor(config?: Config) {
    this.htmlConverter = new HtmlConverter(config?.html)
  }

  getWrappedHtml(
    results: Array<{ html: string; wrapper?: HtmlConvertResult }>
  ) {
    const cache: string[] = []
    let lastWrapper: HtmlConvertResult
    results.push({ html: '' })
    return results.reduce((htmlRt, rt) => {
      if (rt.wrapper && isEqual(rt.wrapper, lastWrapper)) {
        cache.push(rt.html)
      } else {
        if (lastWrapper && cache.length) {
          htmlRt += this.htmlConverter.convertResultToHtml(
            cache.join(''),
            lastWrapper
          )
          cache.length = 0
        }
        lastWrapper = rt.wrapper
        if (rt.wrapper) {
          cache.push(rt.html)
        } else {
          htmlRt += rt.html
        }
      }
      return htmlRt
    }, '')
  }

  public toHtml(delta: Delta) {
    const scroll = new Scroll(delta)
    const paraResults = scroll.children.map((para) => {
      const { children = [], attributes } = para
      const blotResults = children.map((blot) => {
        const { op } = blot
        return this.htmlConverter.convert(
          isTextOp(op) ? escaptHtml(op.insert as string) : op.insert,
          op.attributes
        )
      })
      const blotHtml = this.getWrappedHtml(blotResults)
      const innerHtml = para.needWrapPTag ? `<p>${blotHtml}</p>` : blotHtml
      const paraResult = this.htmlConverter.convert(innerHtml, attributes)
      return paraResult
    })
    return this.getWrappedHtml(paraResults)
  }

  public toMarkdown(delta: Delta) {
    return ''
  }
}
