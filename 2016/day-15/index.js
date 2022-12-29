import $ from '../../helpers'

class Disk {
  constructor(id, size, initial) {
    this.id = id
    this.size = size
    this.position = this.initial = initial
    this.index = $.loopIndex(0, this.size - 1)
    this.reset()
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

export const run = instructions => {
  const disks = instructions.map(instruction => {
    const [id, size, , initial] = instruction.match(/\d+/g).map(Number)

    return new Disk(id, size, initial)
  })

  let delay = -1

  while (disks.some(disk => disk.position)) {
    delay++
    disks.forEach(disk => disk.reset().turn(delay + disk.id))
  }

  return delay
}
