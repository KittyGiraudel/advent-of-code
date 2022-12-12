class Intcode {
  constructor(memory) {
    // Holds whether the program has reached an opcode 99 instruction, causing
    // it to halt permanently.
    this.halted = false
    // Holds the mutable array of numbers for the program to run.
    this.memory =
      typeof memory === 'string' ? memory.split(',').map(Number) : memory
    // Holds a copy of the memory so it can be reset to its original state if
    // desired.
    this.backup = this.memory.slice(0)
    // Holds the current position of the pointer in the memory array.
    this.pointer = 0
    // Holds input values, that are being used by opcode 3 instructions.
    this.inputs = []
    // Holds output values, the last of which tends to hold the final value of
    // the program.
    this.outputs = []
    // Holds whether or not the program should emit execution logs.
    this.withLogs = false
    // Holds the relative base used by instructions in mode 2, and update by
    // opcode 9 instructions.
    this.base = 0
  }

  setLogger(value) {
    this.withLogs = Boolean(value)

    return this
  }

  log(...args) {
    if (this.withLogs) console.log(...args)

    return this
  }

  setInput(input) {
    this.log('➡️ Recording input', input)
    Array.isArray(input) ? this.inputs.push(...input) : this.inputs.push(input)

    return this
  }

  getOutput() {
    const output =
      this.outputs.length === 1 ? this.outputs[0] : this.outputs.slice(0)

    this.log('↩️ Returning output', output)
    this.outputs.length = 0

    return output
  }

  updateMemory(address, value) {
    this.log('✏️ Overwriting address', address, 'with', value)
    this.memory[address] = value

    return this
  }

  hasHalted() {
    this.log('✋ Returning halt status', this.halted)

    return this.halted
  }

  reset() {
    this.log('🔄 Resetting computer')
    this.memory = this.backup.slice(0)
    this.pointer = 0
    this.base = 0
    this.halted = false
    this.inputs = []
    this.outputs = []

    return this
  }

  print() {
    this.log('🖨 Printing memory')

    return this.memory.join(',')
  }

  parseOpcode(opcode) {
    // Instructions have a maximum of 3 arguments, and the opcode value is
    // authored over 2 digits (0 to 99), so the opcode string should be 5 digits
    // long, left-padded with zeroes. Padding is technically not required since
    // we fallback properly in case the mode is not found (undefined), but it’s
    // probably a little more elegant this way. The last 2 digits are the actual
    // value, and the first 3 are the parameters’ mode.
    const string = String(opcode).padStart(5, '0')
    const value = +string.slice(-2)
    const modes = string.slice(0, -2).split('').map(Number).reverse()

    return { modes, value }
  }

  at(index) {
    return this.memory[index] || 0
  }

  // Read the value based on the given pointer (typically a variation of
  // `this.pointer`, such as `this.pointer + 1` to get the 1st argument of an
  // instruction), and its mode, a number between 0 and 2.
  // - If the mode is undefined (technically not possible but heh) or 0, the
  //   argument is in “position mode”, and the returned value is read at the
  //   index given by the argument.
  // - If the mode is 2, the argument is in “relative mode”, and the returned
  //   value is read at the index given by adding the argument + the current
  //   relative base from the computer.
  // - If the mode is 1, the argument is in “immediate mode”, and the returned
  //   value is the argument itself.
  // - Any other mode would cause a runtime error.
  read(pointer, mode) {
    const argument = this.at(pointer)
    if (!mode) return this.at(argument)
    if (mode === 2) return this.at(this.base + argument)
    if (mode === 1) return argument
    throw new Error('❌ Invalid mode for read operation', mode)
  }

  // Return the index at which the value should be written, for which the logic
  // is slightly different than the one of the `read` method, since writing
  // cannot be done in immediate mode.
  // - If the mode is undefined (technically not possible but heh) or 0, the
  //   argument is in “position mode”, and the value will be written at the
  //   index given by the argument.
  // - If the mode is 2, the argument is in “relative mode”, and the value will
  //   be written at the index given by adding the argument + the current
  //   relative base from the computer.
  // - Any other mode (including 1) would cause a runtime error.
  getWriteIndex(pointer, mode) {
    const argument = this.at(pointer)
    if (!mode) return argument
    if (mode === 2) return this.base + argument
    throw new Error('❌ Invalid mode for write operation', mode)
  }

  run() {
    this.log('▶️ Running program')

    while (!this.halted) {
      const p = this.pointer
      const { modes, value } = this.parseOpcode(this.at(p))
      this.log(
        '⤵️ Handling opcode',
        value,
        'with modes',
        modes,
        `(raw ${this.at(p)})`
      )

      switch (value) {
        case 1: {
          const value = this.read(p + 1, modes[0]) + this.read(p + 2, modes[1])
          const index = this.getWriteIndex(p + 3, modes[2])
          this.log('1️⃣ Setting', value, 'at index', index)
          this.memory[index] = value
          this.pointer += 4
          break
        }

        case 2: {
          const value = this.read(p + 1, modes[0]) * this.read(p + 2, modes[1])
          const index = this.getWriteIndex(p + 3, modes[2])
          this.log('2️⃣ Setting', value, 'at index', index)
          this.memory[index] = value
          this.pointer += 4
          break
        }

        case 3: {
          if (this.inputs.length === 0)
            return this.log('3️⃣ Missing input for opcode 3')

          const index = this.getWriteIndex(p + 1, modes[0])
          this.log('3️⃣ Setting', this.inputs[0], 'at index', index)
          this.memory[index] = this.inputs.shift()
          this.pointer += 2
          break
        }

        case 4: {
          const output = this.read(p + 1, modes[0])
          this.log('4️⃣ Outputting', output)
          this.outputs.push(output)
          this.pointer += 2
          break
        }

        case 5: {
          if (this.read(p + 1, modes[0])) {
            const value = this.read(p + 2, modes[1])
            this.log('5️⃣ Setting pointer to', value)
            this.pointer = value
          } else this.pointer += 3
          break
        }

        case 6: {
          if (!this.read(p + 1, modes[0])) {
            const value = this.read(p + 2, modes[1])
            this.log('6️⃣ Setting pointer to', value)
            this.pointer = value
          } else this.pointer += 3
          break
        }

        case 7: {
          const value = +(
            this.read(p + 1, modes[0]) < this.read(p + 2, modes[1])
          )
          const index = this.getWriteIndex(p + 3, modes[2])
          this.log('7️⃣ Setting', value, 'at index', index)
          this.memory[index] = value
          this.pointer += 4
          break
        }

        case 8: {
          const value = +(
            this.read(p + 1, modes[0]) === this.read(p + 2, modes[1])
          )
          const index = this.getWriteIndex(p + 3, modes[2])
          this.log('8️⃣ Setting', value, 'at index', index)
          this.memory[index] = value
          this.pointer += 4
          break
        }

        case 9:
          this.log(
            '9️⃣ Incrementing base',
            this.base,
            'by',
            this.read(p + 1, modes[0])
          )
          this.base += this.read(p + 1, modes[0])
          this.pointer += 2
          break

        case 99:
          this.log('🛑 Halting')
          this.halted = true
          return this

        default:
          throw new Error(`❌ Invalid code ${value} at index ${p}`)
      }
    }

    this.log('✋ Ending program')

    return this
  }

  snapshot() {
    const output = new Intcode(this.backup)

    output.halted = this.halted
    output.memory = this.memory.slice(0)
    output.backup = this.backup.slice(0)
    output.pointer = this.pointer
    output.inputs = this.inputs.slice(0)
    output.outputs = this.outputs.slice(0)
    output.withLogs = this.withLogs
    output.base = this.base

    return output
  }
}

module.exports = { Intcode }
