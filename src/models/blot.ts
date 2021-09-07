import type { Op, Matcher } from '../types'
import { getMatchers, makeHtml } from '../html-maker'
import { Paragraph } from './paragraph'
import { LinkedNode, LinkedNodeClass } from './abstract'
import { isTextOp, isEmbedOp, isBlockEmbedOp } from '../utils'

export class Blot extends LinkedNodeClass<null> implements LinkedNode {
  public op: Op
  public next: Blot = null
  public prev: Blot = null
  public parent: Paragraph = null
  public matchers: Matcher[] = []
  public isEmbed: boolean
  public isBlockEmbed: boolean

  constructor(op: Op) {
    super()
    this.op = op
    this.isEmbed = isEmbedOp(this.op)
    this.isBlockEmbed = isBlockEmbedOp(this.op)

    const attributes = Object.keys(this.op?.attributes || {}).filter(
      (k) => !!this.op?.attributes[k]
    )
    if (this.isEmbed) {
      attributes.push(...Object.keys(this.op.insert))
    }

    this.matchers = getMatchers(attributes).filter(
      (m) =>
        (m.scope === 'block' && this.isBlockEmbed) ||
        (m.scope !== 'block' && !this.isBlockEmbed)
    )
  }

  public toHtml() {
    return this.matchers.reduce(
      (html, matcher) => {
        return makeHtml({
          matcher,
          data: this.isEmbed
            ? (this.op.insert as Record<string, unknown>)[matcher.name]
            : {},
          attributes: this.op.attributes,
          html,
        })
      },
      isTextOp ? (this.op.insert as string) : ''
    )
  }
}
