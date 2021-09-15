import type { Matcher, MatcherValue, AttributeMap } from '../types'
import { ATTRIBUTE_MATCHERS } from './attributes'
import { FORMAT_MATCHERS } from './formats'

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
        return -1
      }
      return 1
    })
}

export function isTextNode(html: string) {
  return !html.trim().match(/^<.+>$/)
}

export function getAttribute(html: string, name: string) {
  if (isTextNode(html)) {
    return null
  }
  const reg1 = new RegExp(` ${name}='(.*?)'`, 'i')
  const reg2 = new RegExp(` ${name}="(.*?)"`, 'i')
  const match = html.match(reg1) || html.match(reg2)
  return match?.[1] ?? null
}

export function removeAttribute(html: string, name: string) {
  if (getAttribute(html, name) !== null) {
    const reg1 = new RegExp(` ${name}='(.*?)'`, 'i')
    const reg2 = new RegExp(` ${name}="(.*?)"`, 'i')
    html = html.replace(reg1, '').replace(reg2, '')
  }
  return html
}

export function setAttribute(html: string, name: string, value: string) {
  html = removeAttribute(html, name)
  const attributeStr = `${name}="${value}"`
  if (isTextNode(html)) {
    return `<span ${attributeStr}>${html}</span>`
  }

  return html.replace(/^<[^>|^/|^ ]+/, (match) => {
    return `${match} ${attributeStr}`
  })
}

export function setAttributes(
  html: string,
  attributes: Record<string, string>
) {
  return Object.keys(attributes).reduce(
    (html, key) => setAttribute(html, key, attributes[key]),
    html
  )
}

export function wrap(html: string, tagName: string) {
  return `<${tagName}>${html}</${tagName}>`
}

export function unwrap(html: string) {
  if (isTextNode(html)) {
    return html
  }

  // for example <img src="http://img.jpg"/>
  if (html.match(/^<[^>]+\/>$/)) {
    return html
  }

  return html.trim().replace(/(^<[^>]+>)(.*)(< *\/[^>]+ *>$)/, (_, _$1, $2) => {
    return $2
  })
}

export function isSelfClose(tagName: string) {
  return ['img'].indexOf(tagName.toLowerCase()) > -1
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
