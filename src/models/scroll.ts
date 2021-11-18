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

    const lastLine = ops.reduce<Op[]>((opsInCurrentLine, op) => {
      const attributes = op.attributes
      if (typeof op.insert === 'string') {
        if (op.insert.indexOf('\n') > -1) {
          const texts = op.insert.split('\n')
          paragraphInfos.push(
            ...texts.slice(0, -1).map((text, i) => ({
              ops: [
                ...(i === 0 ? opsInCurrentLine : []),
                ...(text ? [{ insert: text, attributes: op.attributes }] : []),
              ],
              attributes,
            }))
          )
          opsInCurrentLine = []
          // like \ntext
          if (texts.slice(-1)[0]) {
            opsInCurrentLine.push({ insert: texts.slice(-1)[0], attributes })
          }
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

    // the normal delta data will not happen like this.
    // because there's a return or block embed at the tail.
    if (lastLine.length) {
      paragraphInfos.push({ ops: lastLine })
    }

    return paragraphInfos.filter((info) => info.ops.length)
  }
}
