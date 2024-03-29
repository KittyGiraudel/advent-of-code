import $ from '../../helpers'

class Disk {
  id: number
  size: number
  index: Generator<number, number, number>
  position: number
  initial: number

  constructor(id: number, size: number, initial: number) {
    this.id = id
    this.size = size
    this.position = this.initial = initial
    this.index = $.loopIndex(0, this.size - 1)
  }

  reset() {
    while (this.position !== this.initial) this.turn()

    return this
  }

  turn(times = 1) {
    for (let i = 0; i < times % this.size; i++) {
      this.position = this.index.next().value
    }

    return this.position
  }
}

export const run = (instructions: string[]) => {
  const disks = instructions.map(instruction => {
    const [id, size, , initial] = $.numbers(instruction)

    return new Disk(id, size, initial)
  })

  let delay = -1

  while (disks.some(disk => disk.position)) {
    delay++
    disks.forEach(disk => disk.reset().turn(delay + disk.id))
  }

  return delay
}
