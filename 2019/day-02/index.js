export class Intcode {
  constructor(memory, pointer = 0) {
    this.memory =
      typeof memory === 'string' ? memory.split(',').map(Number) : memory
    this.pointer = pointer
    this.backup = this.memory.slice(0)
  }

  reset() {
    this.memory = this.backup.slice(0)
    this.pointer = 0
    return this
  }

  print() {
    return this.memory.join(',')
  }

  updateMemory(address, value) {
    this.memory[address] = value

    return this
  }

  run() {
    while (this.memory[this.pointer] !== 99) {
      switch (this.memory[this.pointer]) {
        case 1: {
          const a = this.memory[this.memory[this.pointer + 1]]
          const b = this.memory[this.memory[this.pointer + 2]]
          const target = this.memory[this.pointer + 3]
          this.memory[target] = a + b
          this.pointer += 4
          break
        }
        case 2: {
          const a = this.memory[this.memory[this.pointer + 1]]
          const b = this.memory[this.memory[this.pointer + 2]]
          const target = this.memory[this.pointer + 3]
          this.memory[target] = a * b
          this.pointer += 4
          break
        }

        case 99:
          return this.memory[0]
      }
    }

    return this.memory[0]
  }
}

export const findInitParams = input => {
  const computer = new Intcode(input)

  for (let n = 0; n < 100; n++) {
    for (let v = 0; v < n; v++) {
      if (
        computer.reset().updateMemory(1, n).updateMemory(2, v).run() ===
        19690720
      )
        return n * 100 + v
    }
  }

  return null
}
