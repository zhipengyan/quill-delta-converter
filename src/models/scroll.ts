import type { Delta, Op, AttributeMap } from '../types'
import { Paragraph } from './paragraph'
import { isBlockEmbedOp } from '../utils'
import { LinkedNodeClass, LinkedNode } from './abstract'

type ParagraphInfo = {
  ops: Op[]
  attributes?: AttributeMap
}

export class Scroll extends LinkedNodeClass<Paragraph> implements LinkedNode {
  public delta: Delta

  constructor(delta: Delta) {
    super()
    this.delta = delta
    this.constructParagraphs()
  }

  public toHtml() {
    const html = this.children.reduce((html, child) => {
      return html + child.toHtml()
    }, '')
    return html
  }

  private constructParagraphs() {
    const paragraphInfos = this.splitByReturn()
    paragraphInfos.forEach(({ ops, attributes }) => {
      this.appendChild(new Paragraph(ops, attributes))
    })
  }

  // split by return
  private splitByReturn() {
    const ops = this.delta.ops.slice()
    const paragraphInfos: ParagraphInfo[] = []

    ops.reduce<Op[]>((opsInCurrentLine, op) => {
      const attributes = op.attributes
      if (typeof op.insert === 'string') {
        if (op.insert.indexOf('\n') > -1) {
          // the last newline character has no corresponding physical line
          if (op === ops.slice(-1)[0] && op.insert.match(/\n$/)) {
            op.insert = op.insert.replace(/\n$/, '')
          }
          const texts = op.insert.split('\n')
          paragraphInfos.push(
            ...texts.map((text, i) => ({
              ops: [
                ...(i === 0 ? opsInCurrentLine : []),
                { insert: text, attributes: op.attributes },
              ],
              attributes,
            }))
          )
          opsInCurrentLine = []
        } else {
          opsInCurrentLine.push(op)
        }
        return opsInCurrentLine
      } else if (isBlockEmbedOp(op)) {
        if (opsInCurrentLine.length) {
          paragraphInfos.push({ ops: opsInCurrentLine.slice() })
        }
        paragraphInfos.push({ ops: [op] })
        return []
      } else {
        opsInCurrentLine.push(op)
      }

      return opsInCurrentLine
    }, [])

    return paragraphInfos.filter((info) => info.ops.length)
  }
}
