import type { Delta, Config, HtmlConvertResult, AttributeMap } from './types'
import { HtmlConverter } from './converter/html'
import { MarkdownConverter } from './converter/markdown'
import { Scroll } from './models/scroll'
import isEqual from 'deep-equal'
import escaptHtml from 'escape-html'
import { isTextOp } from './utils'
import { Blot } from './models/blot'

export class DeltaConverter {
  public htmlConverter: HtmlConverter
  public mdConverter: MarkdownConverter
  constructor(config?: Config) {
    this.htmlConverter = new HtmlConverter(config?.html)
    this.mdConverter = new MarkdownConverter(config?.markdown)
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
    const { children: scrollChildren } = new Scroll(delta)
    const paraContents = scrollChildren.map((para) => {
      const { children = [], attributes } = para
      const prevLang = para.prev?.attributes?.['code-block']
      const currentLang = attributes?.['code-block']
      const nextLang = para.next?.attributes?.['code-block']

      const groupedBlots = children.reduce<
        Array<{ items: Blot[]; commons: string[] }>
      >((grouped, blot) => {
        const concernedAttrs = ['bold', 'italic', 'strike', 'underline']
        const last = grouped.slice(-1)[0] ?? {
          items: [],
          commons: concernedAttrs.slice(),
        }
        const currentCommons = Object.keys(blot.op.attributes ?? {}).filter(
          (k) => concernedAttrs.indexOf(k) > -1 && last.commons.indexOf(k) > -1
        )
        if (currentCommons.length) {
          last.items.push(blot)
          last.commons = currentCommons.slice()
          if (last !== grouped.slice(-1)[0]) {
            grouped.push(last)
          }
        } else {
          grouped.push({
            items: [blot],
            commons: Object.keys(blot.op.attributes ?? {}).filter(
              (k) => concernedAttrs.indexOf(k) > -1
            ),
          })
        }
        return grouped
      }, [])

      let content = groupedBlots.reduce((c, { items, commons }) => {
        const thisContent = items.reduce((blotsContent, blot) => {
          const currentAttributes = { ...blot.op.attributes }
          commons.forEach((k) => delete currentAttributes[k])
          return (
            blotsContent +
            this.mdConverter.convert(blot.op.insert, currentAttributes)
          )
        }, '')
        return (
          c +
          this.mdConverter.convert(
            thisContent,
            commons.reduce<AttributeMap>((attrs, key) => {
              attrs[key] = true
              return attrs
            }, {})
          )
        )
      }, '')

      content = this.mdConverter.convert(content, attributes)

      if (currentLang) {
        if (prevLang !== currentLang) {
          content = `\n\`\`\` ${currentLang}\n${content}`
        }
        if (nextLang !== currentLang) {
          content += '\n```'
        }
      } else if (prevLang) {
        content += '\n```'
      }
      return content
    })

    return paraContents.join('\n')
  }
}
