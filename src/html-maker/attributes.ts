import { MatcherValue, Matcher } from '../types'

export const ATTRIBUTE_MATCHERS: Record<string, Matcher> = {
  align: {
    scope: 'block',
    type: 'attribute',
    classNames(value: MatcherValue) {
      return `ql-align-${value}`
    },
  },
  background: {
    scope: 'inline',
    type: 'attribute',
    attributes(value: MatcherValue) {
      return { style: `background-color: ${value};` }
    },
  },
  color: {
    scope: 'inline',
    type: 'attribute',
    attributes(value: MatcherValue) {
      return { style: `color: ${value};` }
    },
  },
  direction: {
    scope: 'inline',
    type: 'attribute',
    classNames(value: MatcherValue) {
      return `ql-direction-${value}`
    },
  },
  font: {
    scope: 'inline',
    type: 'attribute',
    classNames(value: MatcherValue) {
      return `ql-font-${value}`
    },
  },
  size: {
    scope: 'inline',
    type: 'attribute',
    classNames(value: MatcherValue) {
      return `ql-size-${value}`
    },
  },
  indent: {
    scope: 'block',
    type: 'attribute',
    classNames(value: MatcherValue) {
      return `ql-indent-${value}`
    },
  },
}
