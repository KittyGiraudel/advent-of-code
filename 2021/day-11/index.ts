import $ from '../../helpers'
import { Coords, Grid } from '../../types'

type Octopus = { value: number; flashed: boolean }

const makeGrid = (rows: Array<string>): Grid<Octopus> =>
  $.grid.create(rows, optopus => ({ value: +optopus, flashed: false }))

const countNewFlashes = (grid: Grid<Octopus>): number =>
  $.grid.reduce(grid, (acc, octopus) => acc + +octopus.flashed, 0)

const processFlashes = (grid: Grid<Octopus>): void => {
  const toIncrement: Array<Coords> = []

  $.grid.forEach(grid, (octopus, ri, ci) => {
    if (!octopus.flashed && octopus.value > 9) {
      octopus.flashed = true
      toIncrement.push(...$.surrounding([ri, ci], 'COORDS'))
    }
  })

  toIncrement.forEach(coords => {
    const octopus = $.access(grid, coords)
    if (octopus) octopus.value++
  })

  if (toIncrement.length > 0) processFlashes(grid)
}

const cycle = (grid: Grid<Octopus>): number => {
  // 1. Increment
  $.grid.forEach(grid, octopus => octopus.value++)

  // 2. Flashes
  processFlashes(grid)

  // 2b. Count flashes
  const flashes = countNewFlashes(grid)

  // 3. Reset
  $.grid.forEach(grid, octopus => {
    octopus.flashed = false
    if (octopus.value > 9) octopus.value = 0
  })

  return flashes
}

export const countFlashes = (rows: Array<string>, steps: number): number => {
  const grid = makeGrid(rows)
  let flashes = 0

  for (let s = 0; s < steps; s++) flashes += cycle(grid)

  return flashes
}

const isSynced = (grid: Grid<Octopus>): boolean =>
  $.grid.every(grid, octopus => octopus.value === 0)

export const findSynchronocity = (rows: Array<string>): number => {
  const grid = makeGrid(rows)
  let i = 0

  while (!isSynced(grid)) i++, cycle(grid)

  return i
}
