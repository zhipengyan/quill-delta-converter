import { ConvertOptions, HtmlConvertResult } from '../../types'
type EmbedContent = Record<string, any>

export const FORMATS: Record<
  string,
  (options?: ConvertOptions) => HtmlConvertResult
> = {
  bold: () => ({ tagName: 'b' }),
  italic: () => ({ tagName: 'i' }),
  underline: () => ({ tagName: 'u' }),
  strike: () => ({ tagName: 's' }),
  link(options) {
    return {
      tagName: 'a',
      attributes: {
        href: options.attributes?.link,
        target: '_blank',
      },
    }
  },
  image(options) {
    return {
      tagName: 'img',
      attributes: {
        src: (options.content as EmbedContent).image as string,
        alt: options.attributes?.alt,
        height: options.attributes?.height,
        width: options.attributes?.width,
      },
    }
  },
  video(options) {
    return {
      tagName: 'iframe',
      classNames: ['ql-video'],
      attributes: {
        src: (options.content as EmbedContent).video as string,
        frameborder: '0',
        allowfullscreen: 'true',
        height: options.attributes?.height,
        width: options.attributes?.width,
      },
    }
  },
  code() {
    return { tagName: 'code' }
  },
  'code-block': () => {
    return {
      tagName: 'pre',
      classNames: ['ql-code-block'],
      wrapper: {
        tagName: 'div',
        classNames: ['ql-code-block-container'],
      },
    }
  },
  blockquote() {
    return {
      tagName: 'blockquote',
    }
  },
  header(options) {
    return {
      tagName: `h${options.attributes?.header}`,
    }
  },
  list(options) {
    const { attributes } = options
    const wrapperTagname = attributes?.list === 'ordered' ? 'ol' : 'ul'

    return {
      innerHtml: `<span class="ql-ui" contenteditable="false"></span>${options.content}`,
      tagName: 'li',
      attributes: {
        'data-list': attributes?.list,
      },
      wrapper: {
        tagName: wrapperTagname,
      },
    }
  },
}
