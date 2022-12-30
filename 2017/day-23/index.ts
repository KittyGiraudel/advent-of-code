class Computer {
  pointer: number
  instructions: string[]
  registers: { [key: string]: number }
  counters: { set: number; sub: number; mul: number; jnz: number }

  constructor(input) {
    this.pointer = 0
    this.instructions = input
    this.registers = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 }
    this.counters = { set: 0, sub: 0, mul: 0, jnz: 0 }
  }

  next() {
    const instruction = this.instructions[this.pointer]
    const [op, X, Y] = instruction.split(' ')

    this.counters[op]++

    switch (op) {
      case 'set': {
        this.registers[X] = this.registers[Y] || +Y
        break
      }
      case 'sub': {
        this.registers[X] -= this.registers[Y] || +Y
        break
      }
      case 'mul': {
        this.registers[X] *= this.registers[Y] || +Y
        break
      }
      case 'jnz': {
        if (this.registers[X] || +X)
          this.pointer += (this.registers[Y] || +Y) - 1
        break
      }
    }

    this.pointer++
  }

  run() {
    while (this.pointer < this.instructions.length) this.next()
  }
}

export const run = (input: string[]): number => {
  const computer = new Computer(input)
  computer.run()
  return computer.counters.mul
}

export const skip = () => {
  const r = {
    a: 1,
    b: 105_700,
    c: 105_700 + 17_000,
    d: 0,
    e: 0,
    f: 1,
    g: 0,
    h: 0,
  }

  do {
    r.f = 1
    r.d = 2
    r.e = 2

    // So I got *super far* in reverse-engineering the assembly code, but I
    // failed to get the following loop, which appears to be a primality check.
    // I didn’t get that loops 1 and 2 were intertwined as such, and thought
    // they were independent from one another, which led me to *always*
    // increment 1, instead of only under the following condition.
    while (r.f && r.d * r.d <= r.b) if (r.b % r.d++ === 0) r.f = 0

    if (r.f === 0) r.h++
    r.g = r.b - r.c
    r.b += 17
  } while (r.g !== 0)

  return r.h
}
