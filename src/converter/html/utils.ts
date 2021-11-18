export function isTextNode(html: string) {
  return !html.trim().match(/^<.+>$/)
}

export function getAttribute(html: string, name: string) {
  if (isTextNode(html)) {
    return null
  }
  const reg1 = new RegExp(`^<\\w*[^>]* ${name}='(.*?)'`, 'i')
  const reg2 = new RegExp(`^<\\w*[^>]* ${name}="(.*?)"`, 'i')
  const match = html.trim().match(reg1) || html.trim().match(reg2)
  return match?.[1] ?? null
}

export function removeAttribute(html: string, name: string) {
  if (getAttribute(html, name) !== null) {
    const reg1 = new RegExp(`^<\\w*[^>]*( ${name}='(.*?)')`, 'i')
    const reg2 = new RegExp(`^<\\w*[^>]*( ${name}="(.*?)")`, 'i')
    html = html
      .replace(reg1, (match, $1) => match.replace($1, ''))
      .replace(reg2, (match, $1) => match.replace($1, ''))
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
