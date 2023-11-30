import $ from '../../helpers'

type Instruction = string | number[]
type Memory = Record<string, number>
type Program = [Memory, string | null]

// Parse the given input into a comprehensible set of instructions.
// @param input - Input data
export const parseProgram = (input: string[]) =>
  input.map(line =>
    line.startsWith('mask')
      ? line.replace('mask = ', '')
      : line
          .match(/mem\[(\d+)\] = (\d+)/)
          ?.slice(1)
          .map(Number) ?? []
  ) as Instruction[]

// Apply given mask to given value.
// @param value - Value as a base-10 integers
// @param mask - Bitmask
const applyMask = (value: number, mask: string) =>
  $.toDec(
    $.stringMap($.toBin(value), (char, i) => (mask[i] === 'X' ? char : mask[i]))
  )

// Loose processor: the mask is used to apply a value at given memory location.
// @param memory - Memory object
// @param mask - Bitmask
// @param instruction - Mask (string value) or memory (key,
//                                        value pair of numbers) instruction
// @return Memory and mask for further processing
export const processLoose = (
  [memory, mask]: Program,
  instruction: Instruction
) => {
  if (typeof instruction === 'string') return [memory, instruction]
  memory[String(instruction[0])] = applyMask(instruction[1], mask!)
  return [memory, mask] as Program
}

// Resolve wildcard characters (`X`) in given address to expand it into multiple
// possible addresses.
// @param value - Masked value
const resolveAddresses = (value: string[]): string[][] =>
  value.includes('X')
    ? [
        ...resolveAddresses($.updateAtIndex(value, value.indexOf('X'), '0')),
        ...resolveAddresses($.updateAtIndex(value, value.indexOf('X'), '1')),
      ]
    : [value]

// Retrieve all possible addresses for the given value and mask.
// @param value - Memory location
// @param mask - Bitmask
const getAddresses = (value: string | number, mask: string) =>
  resolveAddresses(
    Array.from($.toBin(+value)).map((char, i) =>
      mask[i] !== '0' ? mask[i] : char
    )
  )

// Strict processor: the mask is used to retrieve possible addresses to write
// the value at.
// @param memory - Memory object
// @param mask - Bitmask
// @param instruction - Mask (string value) or memory (key,
//                                        value pair of numbers) instruction
// @return [memory, mask] Memory and mask for further processing
export const processStrict = (
  [memory, mask]: Program,
  instruction: Instruction
) => {
  if (typeof instruction === 'string') return [memory, instruction]
  getAddresses(instruction[0], mask!).forEach(
    // @ts-ignore
    address => (memory[address] = instruction[1])
  )
  return [memory, mask] as Program
}

// Execute the given program with the given processor.
// @param input - Raw unparsed program input
// @param processor - Processor to treat every instruction
export const executeProgram = (
  input: string[],
  processor: (acc: Program, value: Instruction) => Program
) => {
  const program = parseProgram(input)
  const [memory] = program.reduce(processor, [{}, null])

  return $.sum(Object.values(memory))
}
