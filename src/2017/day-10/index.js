const $ = require('../../helpers')
const Deque = require('dqs')

class Computer {
  SUFFIX = [17, 31, 73, 47, 23]

  constructor(input, memory) {
    this.pointer = 0
    this.skip = 0
    this.memory = new Deque(memory || $.range(256, 0))
    this.lengths = Array.isArray(input)
      ? input
      : $.toAscii(input, false).concat(this.SUFFIX)
  }

  round(iterations = 1) {
    while (iterations--)
      this.lengths.forEach(length => this.processLength(length))

    return this
  }

  sliceOut(length) {
    const slice = []

    for (let i = 0; i < length; i++) {
      // This is a hack because the `dqs` library does not allow popping the
      // last item of the list. To work around the problem, we inject a null
      // node that we ignore later so the list is never truly empty.
      if (this.memory.length === 1) {
        this.memory.insert(null)
      }

      slice.unshift(this.memory.popLeft())
    }

    return slice
  }

  rebuild(length) {
    const slice = this.sliceOut(length)
    const rest = this.memory.all().filter(a => a !== null)
    const next = new Deque(slice)

    for (let i = 0; i < rest.length; i++) next.insert(rest[i])

    return next
  }

  processLength(length) {
    this.memory.rotate(this.pointer * -1)
    this.memory = this.rebuild(length)
    this.memory.rotate(this.pointer)
    this.pointer = (this.pointer + length + this.skip) % this.memory.length
    this.skip++
  }

  getHash() {
    return $.chunk(this.memory.all(), 16)
      .map(chunk => chunk.reduce((a, b) => a ^ b, 0))
      .map(n => n.toString(16).padStart(2, '0'))
      .join('')
  }

  check() {
    return $.product(this.memory.all().slice(0, 2))
  }
}

const getHash = string => new Computer(string).round(64).getHash()
const run = (lengths, list) => new Computer(lengths, list).round().check()

module.exports = { run, getHash, Computer }