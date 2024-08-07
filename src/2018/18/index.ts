import $ from '../../helpers'
import type { Grid } from '../../types'

const isTree = (n: string) => n === '|'
const isLumberyard = (n: string) => n === '#'

const getNextValue = (value: string, neighbors: string[]) => {
  if (value === '.') return neighbors.filter(isTree).length >= 3 ? '|' : '.'
  if (value === '|')
    return neighbors.filter(isLumberyard).length >= 3 ? '#' : '|'
  if (value === '#')
    return neighbors.find(isTree) && neighbors.find(isLumberyard) ? '#' : '.'
  return value
}

const getScore = (grid: Grid<string>) =>
  grid.count(v => v === '#') * grid.count(v => v === '|')

export const run = (rows: string[], iterations = 1) => {
  const history: number[] = []
  let curr = $.Grid.fromRows(rows)

  for (let i = 0; i < iterations; i++) {
    curr = curr.map((value, coords) =>
      getNextValue(
        value,
        $.surrounding(coords).map(coords => curr.get(coords))
      )
    )

    const score = getScore(curr)
    const index = history.indexOf(score)

    // If the score has already been found in the history *and* the score before
    // it is the same as the previous iteration score, that means we got 2
    // scores in a row that already happened in that order in the past. This is
    // the beginning of a repeated sequence and we can read the final score.
    if (index >= 0 && history[index - 1] === history.at(-1)) {
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
