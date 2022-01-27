const $ = require('../../helpers')

const isTree = n => n === '|'
const isLumberyard = n => n === '#'

const getNextValue = (value, neighbors) => {
  if (value === '.') return neighbors.filter(isTree).length >= 3 ? '|' : '.'
  if (value === '|')
    return neighbors.filter(isLumberyard).length >= 3 ? '#' : '|'
  if (value === '#')
    return neighbors.find(isTree) && neighbors.find(isLumberyard) ? '#' : '.'
}

const getScore = grid => {
  const counters = $.count(grid.flat())

  return counters['#'] * counters['|']
}

const run = (rows, iterations = 1) => {
  const history = []
  let curr = $.grid.create(rows)

  for (let i = 0; i < iterations; i++) {
    curr = $.grid.map($.grid.clone(curr), (value, ri, ci) => {
      const neighbors = $.surrounding([ri, ci], 'COORDS').map(coords =>
        $.access(curr, coords)
      )

      return getNextValue(value, neighbors)
    })

    const score = getScore(curr)
    const index = history.indexOf(score)

    // If the score has already been found in the history *and* the score before
    // it is the same as the previous iteration score, that means we got 2
    // scores in a row that already happened in that order in the past. This is
    // the beginning of a repeated sequence and we can read the final score.
    if (index >= 0 && history[index - 1] === $.last(history)) {
      const sequence = history.slice(index - 1, -1)
      // To find out the score of the last iteration, compute it like this:
      // 1. Subtract the start index of the sequence to 1_000_000_000.
      // 2. Modulo the length of the sequence. This yields the index of the
      //    result in the sequence.
      return sequence[(iterations - index) % sequence.length]
    } else history.push(score)
  }

  return getScore(curr)
}

module.exports = { run }
