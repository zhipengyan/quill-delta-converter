import type Delta from 'quill-delta'
import type AttributeMap from 'quill-delta/dist/AttributeMap'
import type Op from 'quill-delta/dist/Op'

export type { Delta, Op, AttributeMap }

export type MatcherValue =
  | string
  | boolean
  | number
  | null
  | Record<string, any>
export type MatcherType = 'format' | 'attribute'
export type MatcherScope = 'block' | 'inline'

export interface Matcher {
  name?: string
  /** default is 'format' */
  type?: MatcherType
  /** default is 'inline' */
  scope?: MatcherScope
  tagName?: string | ((value: MatcherValue) => string)
  classNames?:
    | string
    | string[]
    | ((value: MatcherValue, attributes?: AttributeMap) => string | string[])
  attributes?:
    | string
    | ((
        value: MatcherValue,
        attributes?: AttributeMap
      ) => Record<string, string>)
  container?: Matcher
  create?(
    /** maybe embed data like op.insert.image or attributes[key] like attributes.list  */
    value: MatcherValue,
    attributes?: AttributeMap,
    innerHtml?: string
  ): string
}

export type Matchers = Record<string, Matcher>
