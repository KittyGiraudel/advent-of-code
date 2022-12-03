const $ = require('../../helpers')

// Parse the given input into a comprehensible set of instructions.
// @param {String} input - Input data
// @return {*[]}
const parseProgram = input =>
  input.map(line =>
    line.startsWith('mask')
      ? line.replace('mask = ', '')
      : line
          .match(/mem\[(\d+)\] = (\d+)/)
          .slice(1)
          .map(Number)
  )

// Apply given mask to given value.
// @param {Number} value - Value as a base-10 integers
// @param {String} mask - Bitmask
// @return {Number}
const applyMask = (value, mask) =>
  $.toDec(
    $.stringMap($.toBin(value), (char, i) => (mask[i] === 'X' ? char : mask[i]))
  )

// Loose processor: the mask is used to apply a value at given memory location.
// @param {Object} memory - Memory object
// @param {String} mask - Bitmask
// @param {String|Number[]} instruction - Mask (string value) or memory (key,
//                                        value pair of numbers) instruction
// @return [memory, mask] Memory and mask for further processing
const processLoose = ([memory, mask], instruction) => {
  if (typeof instruction === 'string') return [memory, instruction]
  memory[String(instruction[0])] = applyMask(instruction[1], mask)
  return [memory, mask]
}

// Resolve wildcard characters (`X`) in given address to expand it into multiple
// possible addresses.
// @param {String[]} value - Masked value
// @return {String[]}
const resolveAddresses = value =>
  value.includes('X')
    ? [
        ...resolveAddresses($.updateAtIndex(value, value.indexOf('X'), '0')),
        ...resolveAddresses($.updateAtIndex(value, value.indexOf('X'), '1')),
      ]
    : [value]

// Retrieve all possible addresses for the given value and mask.
// @param {Number} value - Memory location
// @param {String} mask - Bitmask
// @return {Number[]}
const getAddresses = (value, mask) =>
  resolveAddresses(
    $.stringMap($.toBin(value), (char, i) => (mask[i] !== '0' ? mask[i] : char))
  )

// Strict processor: the mask is used to retrieve possible addresses to write
// the value at.
// @param {Object} memory - Memory object
// @param {String} mask - Bitmask
// @param {String|Number[]} instruction - Mask (string value) or memory (key,
//                                        value pair of numbers) instruction
// @return [memory, mask] Memory and mask for further processing
const processStrict = ([memory, mask], instruction) => {
  if (typeof instruction === 'string') return [memory, instruction]
  getAddresses(instruction[0], mask).forEach(
    address => (memory[address] = instruction[1])
  )
  return [memory, mask]
}

// Execute the given program with the given processor.
// @param {String[]} input - Raw unparsed program input
// @param {Function} processor - Processor to treat every instruction
// @return {Number}
const executeProgram = (input, processor) => {
  const program = parseProgram(input)
  const [memory] = program.reduce(processor, [{}, null])

  return $.sum(Object.values(memory))
}

module.exports = { parseProgram, executeProgram, processLoose, processStrict }
