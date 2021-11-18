import type Delta from 'quill-delta'
import type AttributeMap from 'quill-delta/dist/AttributeMap'
import type Op from 'quill-delta/dist/Op'

export type { Delta, Op, AttributeMap }

export type ConvertOptions = {
  content: string | Record<string, any>
  attributes?: AttributeMap
}

export type HtmlConvertResult = {
  innerHtml?: string
  classNames?: string[]
  attributes?: Record<string, string>
  tagName?: string
  wrapper?: HtmlConvertResult
}

export type MdConvertResult = string

export interface Config {
  html?: {
    formats?: Record<string, (options?: ConvertOptions) => HtmlConvertResult>
    attributes?: Record<string, (options?: ConvertOptions) => HtmlConvertResult>
    order?: string[]
  }
  markdown?: {
    formats?: Record<string, (options?: ConvertOptions) => string>
    attributes?: Record<string, (options?: ConvertOptions) => string>
    order?: string[]
  }
}
