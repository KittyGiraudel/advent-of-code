class Node {
  constructor(value) {
    this.value = value
    this.next = this.prev = null
  }
}

class CircularArray {
  constructor(values = []) {
    this.size = 0
    this.head = this.tail = null

    if (Array.isArray(values)) values.forEach(value => this.push(value))
    else this.push(values)
  }

  set length(n) {
    if (n < 0) {
      throw new Error(`Invalid negative length ${n} for CircularArray.`)
    }

    // Shortcut for `.length = 0` usages where the goal is to empty the array.
    if (n === 0) {
      this.head = this.tail = null
    } else {
      let diff = this.size - n
      while (diff--) this.pop()
    }
  }

  get length() {
    return this.size
  }

  insert(value, direction = +1) {
    const node = new Node(value)

    this.size++

    if (!this.head) {
      node.next = node.prev = this.head = this.tail = node
    } else {
      if (direction === -1) {
        node.next = this.head
        node.prev = this.tail
        this.head.prev = this.tail.next = this.head = node
      } else if (direction === +1) {
        node.prev = this.tail
        node.next = this.head
        this.tail.next = this.head.prev = this.tail = node
      }
    }

    return this
  }

  push(value) {
    return this.insert(value, +1)
  }

  unshift(value) {
    return this.insert(value, -1)
  }

  remove(direction = +1) {
    const value = direction === -1 ? this.head.value : this.tail.value

    this.size--

    if (this.size === 0) {
      this.tail = this.head = null
    } else {
      if (direction === +1) {
        this.tail = this.tail.prev
        this.tail.next = this.head
        this.head.prev = this.tail
      } else if (direction === -1) {
        this.head = this.head.next
        this.head.prev = this.tail
        this.tail.next = this.head
      }
    }

    return value
  }

  pop() {
    return this.remove(+1)
  }

  shift() {
    return this.remove(-1)
  }

  rotate(offset) {
    // Shortcut in case the rotation offset is the same as the array size since
    // it results in a noop.
    if (Math.abs(offset) === this.size || !this.size) return this

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
    // Connect the new head and tail together.
    this.tail.next = this.head
    this.head.prev = this.tail

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
    // Connect the new head and tail together.
    this.head.prev = this.tail
    this.tail.next = this.head

    return this
  }

  toArray() {
    const items = []

    if (!this.size) return items

    let node = this.head

    // The list is looped, so we can’t keep iterating until there is no more
    // next node since it never happens. We need to iterate until we find the
    // head again — this is when we’ve gone full circle.
    do {
      items.push(node.value)
      node = node.next
    } while (!Object.is(node, this.head))

    return items
  }
}

module.exports = CircularArray
