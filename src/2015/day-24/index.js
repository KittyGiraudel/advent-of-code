const $ = require('../../helpers')

// Elegant generator taken from the following article so we don’t have to pre-
// compute all possible permutations as it’s too slow.
// https://feixie1980.medium.com/array-combination-iteration-with-javascript-generator-function-f4718aec1ca0
function* getCombinationsN(array, n) {
  if (n === 1) {
    for (const a of array) yield [a]
  } else {
    for (let i = 0; i <= array.length - n; i++) {
      const groups = getCombinationsN(array.slice(i + 1), n - 1)
      for (const group of groups) yield [array[i], ...group]
    }
  }
}

function* getCombinations(array) {
  for (let i = 1; i <= array.length; i++) yield* getCombinationsN(array, i)
}

const run = (weights, count = 3) => {
  const totalWeight = $.sum(weights)
  const groups = getCombinations(weights)
  let quantum = Infinity
  let length = 1

  for (const group of groups) {
    // If we have already found a result, and we’re moving to a higher group
    // length, abort as we have found what we are looking for.
    if (isFinite(quantum) && group.length > length) break

    // Record the current group length, in case it increased.
    length = group.length

    // If the current group doesn’t allow for even distribution, abort.
    if ($.sum(group) !== totalWeight / count) continue

    // Otherwise, record the quantum result.
    quantum = Math.min(quantum, $.product(group))
  }

  return quantum
}

module.exports = { run }
