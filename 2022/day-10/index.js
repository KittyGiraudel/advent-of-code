import $ from '../../helpers'

const CRT_WIDTH = 40

export class Computer {
  constructor(input) {
    this.cycle = 0
    this.register = 1
    this.memory = []
    this.signals = []

    this.execute(input)
  }

  get strength() {
    return $.sum(this.signals)
  }

  print() {
    return $.chunk(this.memory, CRT_WIDTH)
      .map(row => row.join(''))
      .join('\n')
  }

  draw() {
    const column = this.cycle % CRT_WIDTH
    const withinSprite =
      column === this.register - 1 ||
      column === this.register ||
      column === this.register + 1

    this.memory.push(withinSprite ? '#' : '.')
  }

  record() {
    if ((this.cycle - 20) % CRT_WIDTH === 0)
      this.signals.push(this.register * this.cycle)
  }

  tick() {
    this.draw()
    this.cycle++
    this.record()
  }

  execute(input) {
    input.forEach(instruction => {
      this.tick()

      if (instruction.startsWith('addx')) {
        this.tick()
        this.register += +instruction.split(' ').pop()
      }
    })
  }
}
