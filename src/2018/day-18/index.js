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

const getScore = cache => {
  const counters = $.count(Object.values(cache).map(a => a.curr))

  return counters['#'] * counters['|']
}

const run = (rows, iterations = 1) => {
  const history = []
  const cache = $.grid.reduce(
    $.grid.create(rows),
    (acc, value, ri, ci) => {
      const key = ri + ',' + ci
      const neighbors = $.neighbors.surrounding(ri, ci).map(c => c.join(','))
      acc[key] = { neighbors, curr: value }
      return acc
    },
    {}
  )

  for (let i = 0; i < iterations; i++) {
    // My original implementation used a bi-dimensional grid, but when reaching
    // part 2, I thought I might be able to get away with brute-force with some
    // performance optimizations. It made no difference though because whether
    // I store data in a grid or an object, ultimately I still need to iterate
    // over the 50x50 cells, so the performance is the same. I guess the
    // neighbor lookups are slightly faster here, but it’s probably marginal.
    for (let key in cache) {
      const { neighbors, curr } = cache[key]
      const surroundings = neighbors.map(c => cache[c]?.curr)
      cache[key].next = getNextValue(curr, surroundings)
    }
    for (let key in cache) cache[key].curr = cache[key].next

    const score = getScore(cache)
    const index = history.indexOf(score)

    // If the score has already been found in the history *and* the score before
    // it is the same as the previous iteration score, that means we got 2
    // scores in a row that already happened in that order in the past. This is
    // the beginning of a repeated sequence and we can read the final score.
    if (index >= 0 && history[index - 1] === $.peek(history)) {
      const sequence = history.slice(index - 1, -1)
      // To find out the score of the last iteration, compute it like this:
      // 1. Subtract the start index of the sequence to 1_000_000_000.
      // 2. Modulo the length of the sequence. This yields the index of the
      //    result in the sequence.
      return sequence[(iterations - index) % sequence.length]
    } else history.push(score)
  }

  return getScore(cache)
}

module.exports = { run }
