class Node {
  constructor(value) {
    this.value = value
    this.next = this.prev = null
  }

  remove() {
    this.prev.next = this.next
    this.next.prev = this.prev
  }
}

class CircularArray {
  constructor(values = []) {
    this.size = 0
    this.pointer = null

    if (Array.isArray(values)) values.forEach(value => this.push(value))
    else this.push(values)
  }

  set length(n) {
    if (n < 0) {
      throw new Error(`Invalid negative length ${n} for CircularArray.`)
    }

    // Shortcut for `.length = 0` usages where the goal is to empty the array.
    if (n === 0) {
      this.pointer = null
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
    const push = direction === -1
    const unshift = direction === +1

    this.size++

    if (!this.pointer) {
      node.next = node.prev = this.pointer = node
    } else {
      if (push) {
        node.next = this.pointer.next
        node.prev = this.pointer
        node.next.prev = node
        this.pointer.next = node
      } else if (unshift) {
        node.next = this.pointer
        node.prev = this.pointer.prev
        node.prev.next = node
        this.pointer.prev = node
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
    const value =
      direction === -1 ? this.pointer.value : this.pointer.prev.value
    const pop = direction === +1
    const shift = direction === -1

    this.size--

    if (this.size === 0) {
      this.pointer = null
    } else {
      if (pop) {
        this.pointer.prev.remove()
      } else if (shift) {
        this.pointer = this.pointer.next
        this.pointer.prev.remove()
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

  // In a clockwise rotation, the current pointer becomes the previous item.
  // [0, 1, 2] -> [2, 0, 1] -> [2, 0, 1]
  //  P        ->     P     ->  P
  rotateRight() {
    this.pointer = this.pointer.prev

    return this
  }

  // In a counter-clockwise rotation, the current head becomes the next item.
  // [0, 1, 2] -> [1, 2, 0] -> [1, 2, 0]
  //  P        ->        P  ->  P
  rotateLeft() {
    this.pointer = this.pointer.next

    return this
  }

  toArray() {
    const items = []

    if (!this.size) return items

    let node = this.pointer

    // The list is looped, so we can’t keep iterating until there is no more
    // next node since it never happens. We need to iterate until we find the
    // pointer again — this is when we’ve gone full circle.
    do {
      items.push(node.value)
      node = node.next
    } while (!Object.is(node, this.pointer))

    return items
  }
}

module.exports = CircularArray
