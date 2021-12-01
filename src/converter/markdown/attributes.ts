import { ConvertOptions, HtmlConvertResult } from '../../types'

export const ATTRIBUTES: Record<string, (options?: ConvertOptions) => string> =
  {
    align({ content }) {
      return content as string
    },
    background({ content }) {
      return content as string
    },
    color({ content }) {
      return content as string
    },
    direction({ content }) {
      return content as string
    },
    font({ content }) {
      return content as string
    },
    size({ content }) {
      return content as string
    },
    indent({ content, attributes }) {
      const indent = +(attributes?.indent ?? 0)
      return `${Array.from({ length: indent }).reduce(
        (rt) => rt + '  ',
        ''
      )}${content}`
    },
  }
