import $ from '../../helpers'

type Output = { accumulator: number; exit: number }

// Execute the given array of instructions.
// @param instructions - List of instructions making the program
// @return `accumulator` value and 0 or 1 `exit` code
export const runProgram = (instructions: Array<string>): Output => {
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
// @param line - Line to patch
// @return Patched line
const patchInstruction = (instruction: string): string =>
  instruction.startsWith('nop')
    ? instruction.replace('nop', 'jmp')
    : instruction.replace('jmp', 'nop')

// Execute the given array of instructions after having patched the one at given
// index.
// @param instructions - List of instructions making the program
// @param index - Index of instruction to patch
// @return `accumulator` value and 0 or 1 `exit` code
const runPatchedProgram = (
  instructions: Array<string>,
  index: number
): Output =>
  runProgram(
    $.updateAtIndex(instructions, index, patchInstruction(instructions[index]))
  )

// Monkey-patch and execute the given set instructions to find the faulty line
// and successfully return.
// @param instructions - List of instructions making the program
// @return `accumulator` value and 0 or 1 `exit` code
export const runMonkeyPatchedProgram = (instructions: Array<string>): Output =>
  instructions.reduce(
    (output, instruction, index) =>
      instruction.startsWith('acc') || output.exit === 0
        ? output
        : runPatchedProgram(instructions, index),
    { accumulator: null, exit: null }
  )
