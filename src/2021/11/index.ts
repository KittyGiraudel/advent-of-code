import $ from '../../helpers'
import type { Coords, Grid } from '../../types'

type Octopus = { value: number; flashed: boolean }

const makeGrid = (rows: string[]) =>
  $.Grid.fromRows<Octopus>(rows, optopus => ({
    value: +optopus,
    flashed: false,
  }))

const processFlashes = (grid: Grid<Octopus>) => {
  const toIncrement: Coords[] = []

  grid.forEach((octopus, coords) => {
    if (!octopus.flashed && octopus.value > 9) {
      octopus.flashed = true
      toIncrement.push(...$.surrounding(coords))
    }
  })

  toIncrement.forEach(coords => {
    const octopus = grid.get(coords)
    if (octopus) octopus.value++
  })

  if (toIncrement.length > 0) processFlashes(grid)
}

const cycle = (grid: Grid<Octopus>) => {
  // 1. Increment
  grid.forEach(octopus => octopus.value++)

  // 2. Flashes
  processFlashes(grid)

  // 2b. Count flashes
  const flashes = grid.count(octopus => octopus.flashed)

  // 3. Reset
  grid.forEach(octopus => {
    octopus.flashed = false
    if (octopus.value > 9) octopus.value = 0
  })

  return flashes
}

const countFlashes = (input: string[], steps = 100) => {
  const grid = makeGrid(input)
  let flashes = 0

  for (let s = 0; s < steps; s++) flashes += cycle(grid)

  return flashes
}

const isSynced = (grid: Grid<Octopus>) =>
  grid.every(octopus => octopus.value === 0)

const findSynchronocity = (input: string[]) => {
  const grid = makeGrid(input)
  let i = 0

  while (!isSynced(grid)) {
    i++
    cycle(grid)
  }

  return i
}

export const run = (input: string[], part2 = false) => {
  return part2 ? findSynchronocity(input) : countFlashes(input)
}
