import $ from '../../helpers'
import { Coords, Grid } from '../../types'

const calculateWeight = (grid: Grid<string>) =>
  $.sum(
    grid.flatMap((row, ri) => $.countInString(row, 'O') * (grid.height - ri))
  )

const tilt = (grid: Grid<string>, vector: Coords) => {
  const northOrWest = vector.includes(-1)

  for (let ri = 0; ri < grid.height; ri++) {
    for (let ci = 0; ci < grid.width; ci++) {
      const curr: Coords = [
        northOrWest ? ri : grid.height - 1 - ri,
        northOrWest ? ci : grid.width - 1 - ci,
      ]

      if (grid.get(curr) !== 'O') continue

      let next: Coords = curr

      // My first version operated differently: it used to move all “O” by 1,
      // and then repeat until nothing moved on the board. This was very
      // inefficient (~13s before optimization, 7s after). This version is much
      // faster, as it moves every “O” to its final stage immediately (since
      // their trajectory don’t impact one another provided we iterate on the
      // grid in the correct direction).
      while (grid.get($.applyVector(next, vector)) === '.') {
        next = $.applyVector(next, vector)
      }

      if (grid.get(next) === '.') grid.set(next, 'O').set(curr, '.')
    }
  }
}

const cycle = (grid: Grid<string>) =>
  [
    [-1, 0],
    [0, -1],
    [+1, 0],
    [0, +1],
  ].forEach(vector => tilt(grid, vector as Coords))

export const run = (input: string[], part2: boolean = false) => {
  const grid = $.Grid.fromRows(input)
  const cycles = 1_000_000_000

  if (!part2) {
    tilt(grid, [-1, 0])
    return calculateWeight(grid)
  }

  const history = []

  for (let i = 0; i < cycles; i++) {
    cycle(grid)

    const weight = calculateWeight(grid)
    const index = history.indexOf(weight)

    // This is the typical loop breaker we’ve used every now and then throughout
    // AoC (2019/24, 2018/18, 2017/16…). Maintain a history; if we ever find a
    // sequence of 2 identical values in the history, break the loop and return.
    if (index >= 0 && history[index - 1] === history.at(-1)) {
      const sequence = history.slice(index - 1, -1)
      return sequence[(cycles - index) % sequence.length]
    } else history.push(weight)
  }
}
