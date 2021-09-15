import type { Op, AttributeMap, Matcher } from '../types'
import { Blot } from './blot'
import { Scroll } from './scroll'
import { LinkedNodeClass, LinkedNode } from './abstract'
import { getMatchers, makeHtml } from '../html-maker'

export class Paragraph extends LinkedNodeClass<Blot> implements LinkedNode {
  public ops: Op[] = []
  public attributes: AttributeMap = {}
  public prev: Paragraph = null
  public next: Paragraph = null
  public parent: Scroll = null
  public matchers: Matcher[] = []

  constructor(ops: Op[], attributes?: AttributeMap) {
    super()
    this.ops = ops
    this.attributes = attributes
    this.ops.forEach((op) => {
      this.appendChild(new Blot(op))
    })
    this.matchers = getMatchers(Object.keys(attributes || {})).filter(
      (m) => m.scope === 'block'
    )
  }

  public toHtml() {
    const attributes = this.attributes
    const matchers = this.matchers

    const innerHtml = this.children.reduce<string>((html, blot) => {
      return html + blot.toHtml()
    }, '')

    const formatMatchers = matchers.filter((m) => m.type === 'format')
    const hasOneSingleBlockEmbed =
      this.children.length === 1 && this.children[0].isBlockEmbed

    return matchers.reduce(
      (html, matcher) => {
        if (hasOneSingleBlockEmbed && matcher.type === 'format') {
          return html
        }
        return makeHtml({
          value: attributes?.[matcher.name],
          matcher,
          attributes,
          html,
        })
      },
      !hasOneSingleBlockEmbed && formatMatchers.length === 0
        ? `<p>${innerHtml}</p>`
        : innerHtml
    )
  }
}
