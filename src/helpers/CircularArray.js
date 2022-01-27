class Node {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

class CircularArray {
  constructor(values = []) {
    this.size = 0
    this.head = null
    this.tail = null

    if (Array.isArray(values)) values.forEach(value => this.push(value))
    else this.push(values)
  }

  set length(n) {
    if (n < 0) {
      throw new Error(`Invalid negative length ${n} for CircularArray.`)
    }

    // Shortcut for `.length = 0` usages where the goal is to empty the array.
    if (n === 0) {
      this.head = null
      this.tail = null
    } else {
      let diff = this.size - n
      while (diff--) this.pop()
    }
  }

  get length() {
    return this.size
  }

  push(value) {
    const node = new Node(value)
    this.size++

    if (!this.head) {
      this.head = node
      this.tail = this.head
    } else {
      // Add the new node at the end of the chain, and therefore mark *its*
      // previous node as the current tail. Mark the next node of the current
      // tail to the new node. And finally update the tail to the new node.
      node.prev = this.tail
      this.tail.next = node
      this.tail = node
    }

    return this
  }

  pop() {
    const value = this.tail.value

    this.size--

    if (this.size === 0) {
      this.tail = null
      this.head = null
    } else {
      this.tail = this.tail.prev
      this.tail.next = null
    }

    return value
  }

  shift() {
    const value = this.head.value

    this.size--

    if (this.size === 0) {
      this.tail = null
      this.head = null
    } else {
      this.head = this.head.next
      this.head.prev = null
    }

    return value
  }

  rotate(offset) {
    // Shortcut in case the rotation offset is the same as the array size since
    // it results in a noop.
    if (Math.abs(offset) === this.size) return this

    if (offset > 0) while (offset--) this.rotateRight()
    else while (offset++) this.rotateLeft()

    return this
  }

  // In a clockwise rotation, the current head becomes the 2nd item, the 2nd
  // item the 3rd, and so on, the second-to-last item becomes the new tail, and
  // the current tail becomes the new head.
  // [0, 1, 2] -> [2, 0, 1] -> [2, 0, 1]
  //  H     T  ->  T  H     ->  H     T
  rotateRight() {
    const tail = this.tail
    const head = this.head
    // Mark the current tail as the previous item of the current head, and the
    // current head as the next item of the current tail.
    head.prev = tail
    tail.next = head
    // Make the previous tail the new head, and the previous second-to-last item
    // as the new tail.
    this.head = tail
    this.tail = this.tail.prev
    // Shave the edges off from the new tail and head.
    this.tail.next = undefined
    this.head.prev = undefined

    return this
  }

  // In a counter-clockwise rotation, the current head becomes the new tail, the
  // 2nd item becomes the new head, the 3rd item becomes the 2nd, and so on, and
  // the current tail becomes the second-to-last item.
  // [0, 1, 2] -> [1, 2, 0] -> [1, 2, 0]
  //  H     T  ->     T  H  ->  H     T
  rotateLeft() {
    const tail = this.tail
    const head = this.head
    // Mark the current tail as the previous item of the current head, and the
    // current head as the next item of the current tail.
    head.prev = tail
    tail.next = head
    // Make the previous head the new tail, and the previous second item as the
    // new head.
    this.tail = head
    this.head = this.head.next
    // Shave the edges off from the new tail and head.
    this.head.prev = undefined
    this.tail.next = undefined

    return this
  }

  toArray() {
    const items = []
    let node = this.head

    while (node) {
      items.push(node.value)
      node = node.next
    }

    return items
  }
}

module.exports = CircularArray
