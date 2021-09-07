export interface LinkedNode {
  prev: LinkedNode | null
  next: LinkedNode | null
  parent: LinkedNode | null
  children: LinkedNode[] | null
}

export class LinkedNodeClass<T extends LinkedNode> {
  public children: T[] = []
  public next: LinkedNode = null
  public prev: LinkedNode = null
  public parent: LinkedNode = null

  public appendChild(child: T) {
    const tail = this.children.slice(-1)[0]
    if (tail) {
      tail.next = child
      child.prev = tail
    }
    child.parent = this
    this.children.push(child)
  }

  public toHtml(): string {
    return ''
  }
}
