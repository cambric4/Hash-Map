import { LinkedList } from './linked-list.js'

export class Bucket {
  list = new LinkedList()

  set (key, value) {
    const node = this.list.getNodeByKey(key)
    if (node) {
      node.data = value
    } else {
      this.list.appendKeyValue(key, value)
    }
  }

  get (key) {
    return this.list.getNodeByKey(key)
  }

  remove (key) {
    this.list.removeAt(this.list.find(key))
  }
}