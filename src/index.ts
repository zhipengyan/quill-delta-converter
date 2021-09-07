import type { Delta, Matchers } from './types'
import { register } from './html-maker'
import { Scroll } from './models/scroll'

export default function (data: Delta, customMatchers?: Matchers): string {
  if (customMatchers) {
    register(customMatchers)
  }

  const scroll = new Scroll(data)
  return scroll.toHtml()
}
