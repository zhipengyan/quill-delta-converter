import { ConvertOptions, HtmlConvertResult } from '../../types'

export const ATTRIBUTES: Record<
  string,
  (options?: ConvertOptions) => HtmlConvertResult
> = {
  align(options) {
    return {
      classNames: [`ql-align-${options.attributes?.align}`],
    }
  },
  background(options) {
    return {
      attributes: {
        style: `background-color: ${options.attributes?.background};`,
      },
    }
  },
  color(options) {
    return {
      attributes: {
        style: `color: ${options.attributes?.color};`,
      },
    }
  },
  direction(options) {
    return {
      classNames: [`ql-direction-${options.attributes?.direction}`],
    }
  },
  font(options) {
    return {
      classNames: [`ql-font-${options.attributes?.font}`],
    }
  },
  size(options) {
    return {
      classNames: [`ql-size-${options.attributes?.size}`],
    }
  },
  indent(options) {
    return {
      classNames: [`ql-indent-${options.attributes?.indent}`],
    }
  },
}
