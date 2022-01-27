const $ = require('../../helpers')

// Get the destination cup number.
// @param {Number} current - Current cup value
// @param {Number[]} picks - 3 picked cups
// @param {Number} max - Maximum value
// @return {Number}
const getDest = (current, picks, max) => {
  const destination = current - 1
  if (destination > 0 && !picks.includes(destination)) return destination
  return getDest(destination || max + 1, picks, max)
}

// Pick the 3 cups to the right side of the current one.
// @param {UInt32Array} map - Map of links
// @param {Number} current - Current cup value
// @return {Number[]}
const pickCups = (map, current) => {
  const picks = []

  picks.push(map[current])
  picks.push(map[picks[0]])
  picks.push(map[picks[1]])

  return picks
}

// Generate the initial map of linked values.
// @param {Number[]} input - Initial numbers
// @param {Number} size - Amount of numbers in the list
// @return {UInt32Array}
const init = (input, size) => {
  const map = new Uint32Array(size + 1)

  // Fill the array with all the numbers from 1 to size; index 0 is empty.
  for (let i = 1; i <= size; i++) map[i] = i + 1

  // Go through the initial input, and map each value to the next one in the
  // list (or the first to loop through).
  input.forEach((n, index, array) => (map[n] = array[index + 1] || array[0]))

  // If there are more numbers than the initial provided ones, remap the value
  // of the last provided number to a padded value, and the last value of the
  // map to the first provided number.
  if (size > input.length) {
    map[size] = input[0]
    map[$.last(input)] = input.length + 1
  }

  return map
}

// Play a given amount of rounds from the given input, padding up to a certain
// amount in case there should be more numbers than the one initially provided.
// @param {Number[]} input - Initial numbers
// @param {Number} rounds - Amount of rounds to play
// @param {Number} size - Amount of numbers in the list
// @return {UInt32Array}
const play = (input, rounds = 10, size = input.length) => {
  const map = init(input, size)
  let curr = input[0]

  for (let i = 0; i < rounds; i++) {
    const pick = pickCups(map, curr)
    const dest = getDest(curr, pick, size)

    map[curr] = map[pick[2]]
    map[pick[2]] = map[dest]
    map[dest] = pick[0]

    curr = map[curr]
  }

  return map
}

// Serialise the chain from the number 1 onwards, omitting it.
// @param {UInt32Array} map - Map of links
// @return {Number}
const serializeChain = map => {
  let output = ''
  let current = map[1]

  while (current !== 1) {
    output += current
    current = map[current]
  }

  return +output
}

// Get the product of the 2 cups at right of the one labeled 1.
// @param {UInt32Array} map - Map of links
// @return {Number}
const getChainValue = map => map[1] * map[map[1]]

module.exports = { play, serializeChain, getChainValue }
