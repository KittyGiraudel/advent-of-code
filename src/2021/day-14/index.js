const countOccurrences = require('../../helpers/countOccurrences')
const countInString = require('../../helpers/countInString')

const count = (input, iterations = 1) => {
  const string = input[0]
  // Initialize letter counters based on the characters of the initial string.
  const counters = countOccurrences(string.split(''))
  // Parse the instructions.
  const instructions = input[1]
    .split('\n')
    .map(instruction => instruction.split(' -> '))

  // Initialize the first map by counting the occurrences of every replacement
  // pair in the original string. Every iteration then will based its counting
  // map on the previous one.
  let curr = instructions.reduce((acc, [needle]) => {
    acc[needle] = countInString(string, needle)
    return acc
  }, {})
  let next = {}

  for (let i = 0; i < iterations; i++) {
    next = {}

    instructions.forEach(([needle, replacement]) => {
      // Read how many occurrences of the replacement pair we found.
      const count = curr[needle]
      const [first, second] = needle

      // If it’s not found, then this instruction can be skipped.
      if (!count) return

      // Increment the counter of the inserted letter by the amount of recorded
      // occurrences of the replacement pair.
      counters[replacement] = (counters[replacement] || 0) + count

      // Then, record the newly generated pairs. Each of them is incremented by
      // the amount of recorded occurrences of the replacement pair.
      // For instance, for CH -> B: we increment CB and HB by the amount of CH
      // pairs found.
      next[first + replacement] = (next[first + replacement] || 0) + count
      next[replacement + second] = (next[replacement + second] || 0) + count

      // Finally, decrease the amount of replacement pairs we are looking for,
      // as they are getting broken.
      next[needle] = (next[needle] || 0) - count
    })

    // Preserve untouched pairs from the previous string.
    for (let pair in curr) next[pair] = (next[pair] || 0) + curr[pair]

    // Replace the previous map with the new one for the next iteration.
    curr = next
  }

  // Once the iterations are over, compute the score by subtracting the lowest
  // counter from the highest one.
  const counts = Object.values(counters)

  return Math.max(...counts) - Math.min(...counts)
}

module.exports = { count }
