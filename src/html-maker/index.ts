import type { Matcher, MatcherValue, AttributeMap } from '../types'
import { ATTRIBUTE_MATCHERS } from './attributes'
import { FORMAT_MATCHERS } from './formats'
import { isSelfClose, setAttribute, getAttribute } from './utils'

let matchers: Record<string, Matcher> = {
  ...FORMAT_MATCHERS,
  ...ATTRIBUTE_MATCHERS,
}

export function register(customMatchers: Record<string, Matcher>) {
  matchers = {
    ...matchers,
    ...customMatchers,
  }
}

export function getMatchers(names?: string[]) {
  if (!names) {
    return Object.values(matchers)
  }
  return Object.keys(matchers)
    .filter((key) => names.indexOf(key) > -1)
    .map((key) => ({ ...matchers[key], name: key }))
    .sort((a, b) => {
      if (a.type === b.type) {
        return 0
      } else if (a.type === 'attribute') {
        return 1
      }
      return -1
    })
}

export function makeHtml(options: {
  matcher: Matcher
  value?: MatcherValue
  attributes?: AttributeMap
  html?: string
}) {
  const { matcher, value, attributes } = options
  let { html } = options

  if (matcher.create) {
    html = matcher.create(value, attributes, html)
  } else if (matcher.tagName) {
    const tagName =
      typeof matcher.tagName === 'function'
        ? matcher.tagName(value)
        : matcher.tagName
    html = isSelfClose(tagName)
      ? `<${tagName}/>`
      : `<${tagName}>${html}</${tagName}>`
  }

  if (matcher.classNames) {
    const className = getAttribute(html, 'class')
    const newClassNames = className ? className.split(' ') : []
    if (typeof matcher.classNames === 'string') {
      newClassNames.push(...matcher.classNames.split(' '))
    } else if (Array.isArray(matcher.classNames)) {
      newClassNames.push(...matcher.classNames)
    } else if (typeof matcher.classNames === 'function') {
      const cls = matcher.classNames(value, attributes)
      if (Array.isArray(cls)) {
        newClassNames.push(...cls)
      } else {
        newClassNames.push(cls)
      }
    }
    html = setAttribute(html, 'class', newClassNames.join(' '))
  }

  if (matcher.attributes) {
    let attrs: Record<string, string> = {}
    if (typeof matcher.attributes === 'string') {
      attrs = {
        ...attrs,
        [matcher.attributes]: value ?? attributes[matcher.attributes],
      }
    } else if (typeof matcher.attributes === 'function') {
      attrs = matcher.attributes(value, attributes)
    }
    html = Object.keys(attrs).reduce((html, key) => {
      return setAttribute(html, key, attrs[key])
    }, html)
  }

  return html
}
