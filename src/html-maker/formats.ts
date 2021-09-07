import { Matcher, MatcherValue, AttributeMap } from '../types'

export const FORMAT_MATCHERS: Record<string, Matcher> = {
  bold: {
    type: 'format',
    tagName: 'b',
  },
  italic: {
    type: 'format',
    tagName: 'i',
  },
  underline: {
    type: 'format',
    tagName: 'u',
  },
  strike: {
    type: 'format',
    tagName: 's',
  },
  link: {
    type: 'format',
    tagName: 'a',
    classNames: 'ql-link',
    attributes(_value: MatcherValue, attributes?: AttributeMap) {
      const href = attributes?.link
      if (href) {
        return { href }
      }
      return {}
    },
  },
  image: {
    type: 'format',
    tagName: 'img',
    attributes(value: MatcherValue, attributes?: AttributeMap) {
      const rt: Record<string, string> = { src: value as string }
      Object.keys(attributes || {}).forEach((key) => {
        if (['alt', 'height', 'width'].indexOf(key) > -1) {
          rt[key] = attributes[key]
        }
      })
      return rt
    },
  },
  video: {
    type: 'format',
    scope: 'block',
    tagName: 'iframe',
    classNames: 'ql-video',
    attributes(value: MatcherValue) {
      return {
        src: value as string,
        frameborder: '0',
        allowfullscreen: 'true',
      }
    },
  },
  code: {
    type: 'format',
    tagName: 'code',
  },
  'code-block': {
    type: 'format',
    scope: 'block',
    tagName: 'div',
    classNames: 'ql-code-block',
    container: {
      scope: 'block',
      tagName: 'div',
      classNames: 'ql-code-block-container',
    },
  },
  blockquote: {
    type: 'format',
    scope: 'block',
    tagName: 'blockquote',
  },
  header: {
    type: 'format',
    scope: 'block',
    tagName(value: MatcherValue) {
      if (value) {
        return `h${value}`
      }
      return ''
    },
  },
  list: {
    type: 'format',
    scope: 'block',
    create(value: MatcherValue, _attributes: AttributeMap, innerHtml: string) {
      return `<li data-list="${value}"><span class="ql-ui"></span>${innerHtml}</li>`
    },
    container: {
      type: 'format',
      scope: 'block',
      tagName(value: MatcherValue) {
        if (value === 'ordered') {
          return 'ol'
        }
        return 'ul'
      },
    },
  },
}
