import type { Op } from '../types'
import { Paragraph } from './paragraph'
import { LinkedNode, LinkedNodeClass } from './abstract'
import { isEmbedOp, isBlockEmbedOp } from '../utils'

export class Blot extends LinkedNodeClass<null> implements LinkedNode {
  public op: Op
  public next: Blot = null
  public prev: Blot = null
  public parent: Paragraph = null
  public isEmbed: boolean
  public isBlockEmbed: boolean

  constructor(op: Op) {
    super()
    this.op = op
    this.isEmbed = isEmbedOp(this.op)
    this.isBlockEmbed = isBlockEmbedOp(this.op)
  }
}
