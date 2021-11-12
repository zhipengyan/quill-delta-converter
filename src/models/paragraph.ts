import type { Op, AttributeMap } from '../types'
import { Blot } from './blot'
import { Scroll } from './scroll'
import { LinkedNodeClass, LinkedNode } from './abstract'

export class Paragraph extends LinkedNodeClass<Blot> implements LinkedNode {
  public ops: Op[] = []
  public prev: Paragraph = null
  public next: Paragraph = null
  public parent: Scroll = null
  private _attributes: AttributeMap = {}

  constructor(ops: Op[], attributes?: AttributeMap) {
    super()
    this.ops = ops
    this.attributes = attributes
    this.ops.forEach((op) => {
      this.appendChild(new Blot(op))
    })
  }

  get attributes() {
    return this._attributes || {}
  }

  set attributes(value: AttributeMap) {
    this._attributes = value
  }

  public get needWrapPTag() {
    if (this.children.some((child) => child.isBlockEmbed)) {
      return false
    }
    if (
      Object.keys(this.attributes).some(
        (key) => ['blockquote', 'header'].indexOf(key) > -1
      )
    ) {
      return false
    }

    return true
  }
}
