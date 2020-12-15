// Get the last number said after `target` rounds with `numbers` as a starting
// point.
// @param {Number[]} numbers - Initial set of numbers
// @param {Number} rounds - Rounds to play
const get = (numbers, rounds = 1) => {
  const map = new Map(numbers.map((n, i) => [n, i]))
  let last = numbers[numbers.length - 1]

  for (let i = numbers.length; i < rounds; i++) {
    const value = map.has(last) ? i - map.get(last) - 1 : 0
    map.set(last, i - 1)
    last = value
  }

  return last
}

module.exports = { get }
