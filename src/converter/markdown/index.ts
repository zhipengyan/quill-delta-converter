import type { AttributeMap, Config, ConvertOptions } from '../../types'
import { ATTRIBUTES } from './attributes'
import { FORMATS } from './formats'
import { BaseConverter } from '../base'

export class MarkdownConverter extends BaseConverter {
  constructor(config?: Config['markdown']) {
    super(config)
    this.formatMethods = {
      ...FORMATS,
      ...config?.formats,
    }
    this.attributeMethods = {
      ...ATTRIBUTES,
      ...config?.attributes,
    }
    this.orderInDefault = [...Object.keys(FORMATS), ...Object.keys(ATTRIBUTES)]
  }

  // getMethod
  convert(content?: string | Record<string, any>, attributes?: AttributeMap) {
    const names = Object.keys(attributes || {})
    if (typeof content === 'object') {
      names.push(...Object.keys(content))
    }
    const markdown = Array.prototype.reduce.call(
      this.getConvertMethods(names),
      (
        content: string | Record<string, any>,
        convert: (options?: ConvertOptions) => string
      ) => {
        return convert({
          content,
          attributes,
        })
      },
      content
    )

    return markdown
  }
}
