import type { Op } from './types'

export const BLOCK_EMBED_NAMES = ['video', 'formula', 'table']

export const isTextOp = (op: Op) => typeof op.insert === 'string'

export const isEmbedOp = (op: Op) => {
  return typeof op.insert === 'object'
}

export const isBlockEmbedOp = (op: Op) => {
  if (isEmbedOp(op)) {
    return BLOCK_EMBED_NAMES.some((name) =>
      Object.prototype.hasOwnProperty.call(op.insert, name)
    )
  }

  return false
}
