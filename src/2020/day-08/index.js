const $ = require('../../helpers')

// Execute the given array of instructions.
// @param {String[]} instructions - List of instructions making the program
// @return {Object} `accumulator` value and 0 or 1 `exit` code
const runProgram = instructions => {
  const history = []
  let accumulator = 0
  let pointer = 0

  // As long as we have an instruction to execute and it has not been executed
  // yet, keep running.
  while (instructions[pointer] && !history.includes(pointer)) {
    history.push(pointer)

    const [operation, argument] = instructions[pointer].split(' ')

    switch (operation) {
      case 'acc':
        accumulator += Number(argument)
        pointer++
        break
      case 'jmp':
        pointer += Number(argument)
        break
      case 'nop':
        pointer++
        break
      default:
    }
  }

  return { accumulator, exit: Number(pointer < instructions.length) }
}

// Patch given instruction by making it `jmp` instruction if it’s a `nop` one or
// `nop` instruction if it’s a `jmp` one.
// @param {String} line - Line to patch
// @return {String} Patched line
const patchInstruction = instruction =>
  instruction.startsWith('nop')
    ? instruction.replace('nop', 'jmp')
    : instruction.replace('jmp', 'nop')

// Execute the given array of instructions after having patched the one at given
// index.
// @param {String[]} instructions - List of instructions making the program
// @param {Number} index - Index of instruction to patch
// @return {Object} `accumulator` value and 0 or 1 `exit` code
const runPatchedProgram = (instructions, index) =>
  runProgram(
    $.updateAtIndex(instructions, index, patchInstruction(instructions[index]))
  )

// Monkey-patch and execute the given set instructions to find the faulty line
// and successfully return.
// @param {String[]} instructions - List of instructions making the program
// @return {Object} `accumulator` value and 0 or 1 `exit` code
const runMonkeyPatchedProgram = instructions =>
  instructions.reduce(
    (output, instruction, index) =>
      instruction.startsWith('acc') || output.exit === 0
        ? output
        : runPatchedProgram(instructions, index),
    {}
  )

module.exports = { runProgram, runMonkeyPatchedProgram }
