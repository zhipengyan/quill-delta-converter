import { ConvertOptions } from '../../types'
type EmbedContent = Record<string, any>

export const FORMATS: Record<string, (options?: ConvertOptions) => string> = {
  bold: ({ content }) => `**${content}**`,
  italic: ({ content }) => `_${content}_`,
  underline: ({ content }) => `<u>${content}</u>`,
  strike: ({ content }) => `~~${content}~~`,
  script: ({ content, attributes }) => {
    if (attributes?.script === 'super') {
      return `<sup>${content}</sup>`
    } else if (attributes?.script === 'sub') {
      return `<sub>${content}</sub>`
    }
    return content as string
  },
  link({ content, attributes }) {
    const link = attributes?.link ?? ''
    return `[${content}](${link})`
  },
  image({ content, attributes }) {
    const src = (content as EmbedContent).image as string
    const { alt = 'img' } = attributes ?? {}

    return `![${alt}](${src})`
  },
  video({ content, attributes }) {
    const src = (content as EmbedContent).video as string
    const { width, height } = attributes ?? {}
    return `<iframe src="${src}" frameborder="0" allowfullscreen="true" height="${height}" width="${width}" />`
  },
  code({ content }) {
    return `\`${content}\``
  },
  'code-block': ({ content }) => content as string,
  blockquote({ content }) {
    return `> ${content}`
  },
  header({ content, attributes }) {
    const header = +(attributes?.header ?? 0)
    return `${Array.from({ length: header })
      .map(() => '#')
      .join('')} ${content}`
  },
  list({ content, attributes }) {
    let prefix = '1.'
    switch (attributes?.list) {
      case 'ordered':
        prefix = '1.'
        break
      case 'bullet':
        prefix = '-'
        break
      case 'checked':
        prefix = '- [x]'
        break
      case 'unchecked':
        prefix = '- [ ]'
        break
      default:
        prefix = ''
    }
    return `${prefix} ${content}`
  },
}
