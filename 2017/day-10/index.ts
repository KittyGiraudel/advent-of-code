import Circularray from 'circularray'
import $ from '../../helpers'

export class Computer {
  pointer: number
  skip: number
  memory: Circularray<number>
  lengths: Array<number>

  SUFFIX = [17, 31, 73, 47, 23]

  constructor(input: string | Array<number>, memory?: Array<number>) {
    this.pointer = 0
    this.skip = 0
    this.memory = new Circularray(memory || $.range(256, 0))
    this.lengths = Array.isArray(input)
      ? input
      : $.toAscii(input, false).concat(this.SUFFIX)
  }

  round(iterations: number = 1): this {
    while (iterations--)
      this.lengths.forEach(length => this.processLength(length))

    return this
  }

  sliceOut(length: number): Array<number> {
    const slice = []

    for (let i = 0; i < length; i++) slice.unshift(this.memory.shift())

    return slice
  }

  rebuild(length: number): Circularray<number> {
    const slice = this.sliceOut(length)
    const rest = this.memory.toArray().filter((a: number) => a !== null)
    const next = new Circularray(slice)

    for (let i = 0; i < rest.length; i++) next.push(rest[i])

    return next
  }

  processLength(length: number) {
    this.memory.rotate(this.pointer * -1)
    this.memory = this.rebuild(length)
    this.memory.rotate(this.pointer)
    this.pointer = (this.pointer + length + this.skip) % this.memory.length
    this.skip++
  }

  getHash(): string {
    return $.chunk(this.memory.toArray(), 16)
      .map(chunk => chunk.reduce((a, b) => a ^ b, 0))
      .map(n => n.toString(16).padStart(2, '0'))
      .join('')
  }

  check(): number {
    return $.product(this.memory.toArray().slice(0, 2))
  }
}

export const getHash = (string: string) =>
  new Computer(string).round(64).getHash()

export const run = (lengths: Array<number>, list?: Array<number>) =>
  new Computer(lengths, list).round().check()
