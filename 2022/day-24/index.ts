import $ from '../../helpers'
import { Coords, Grid } from '../../types'

type Grids = Map<number, Grid<string[]>>

// This function builds *all* the possible mazes mapped to the time they
// happened at (from 0 to time `h*w-1`). However, cells are not strings, they
// are arrays: `[]` for empty positions, `['#']` for walls, and `['<', '>']` for
// blizzards (with the direction of each blizzard within that cell).
// Ref: https://gist.github.com/p-a/47d58303ec3acf881f26bca1e889f7c8
const getGrids = (input: string[]) => {
  const grid = $.grid.create<string[]>(input, value =>
    value === '.' ? [] : [value]
  )

  // These are the *inner* dimensions, taking the walls into consideration. So
  // for a 10x10 maze, these would be 8x8.
  const width = grid[0].length - 2
  const height = grid.length - 2

  // This is called `isWallOrDoor` and not `isWall` on purpose because the
  // starting point and the ending point both return `true` for that function.
  const isWallOrDoor = (grid: Grid<string[]>, ri: number, ci: number) =>
    ri === 0 || ri === grid.length - 1 || ci === 0 || ci === grid[0].length - 1

  return $.array(height * width - 1).reduce<Grids>((acc, _, index) => {
    const curr = acc.get(index)!

    // Start the new maze from an empty grid: only the borders are marked as
    // taken, everything else is considered empty. Note that we preserve the
    // border value because while it’s often `['#']`, it is in fact `[]` for
    // doors.
    const next = $.grid.map(grid, (value, ri, ci) =>
      isWallOrDoor(grid, ri, ci) ? value : []
    )

    // Then iterate through the *current* grid to generate the next one: skip
    // the borders (they are essentially immutable as blizzards cannot reach the
    // doords), and for each cell, iterate over its hypothetical blizzards and
    // move them.
    $.grid.forEach(curr, (value, ri, ci) => {
      if (isWallOrDoor(curr, ri, ci)) return

      value.forEach(direction => {
        let nRi = ri
        let nCi = ci

        if (direction === '<' && --nCi === 0) nCi = width
        if (direction === '>' && ++nCi === width + 1) nCi = 1
        if (direction === 'v' && ++nRi === height + 1) nRi = 1
        if (direction === '^' && --nRi === 0) nRi = height

        next[nRi][nCi].push(direction)
      })
    })

    return acc.set(index + 1, next)
  }, new Map([[0, grid]]))
}

const findDoor = (row: string) => row.split('').findIndex(col => col === '.')

type Node = {
  coords: Coords
  time: number
}

const getMoves = (curr: Node) =>
  $.bordering(curr.coords, 'COORDS')
    .concat([curr.coords])
    .map((coords: Coords) => ({ coords, time: curr.time + 1 } as Node))

const cross = (
  grids: Grids,
  startCoords: Coords,
  endCoords: Coords,
  time = 0
) =>
  $.pathfinding.gbfs({
    start: { coords: startCoords, time },
    isGoal: curr => $.toPoint(curr.coords) === $.toPoint(endCoords),
    toKey: curr => $.toPoint(curr.coords) + ((curr.time + 1) % grids.size),
    heuristic: curr => $.manhattan(curr.coords, endCoords) + curr.time + 1,
    getNextNodes: curr => {
      const index = (curr.time + 1) % grids.size
      // Retrieve the state of the maze based on the current time.
      const grid = grids.get(index)!

      // The grid only arrays, so a given array has no item, it means it’s
      // a free cell (no wall and no blizzard).
      return getMoves(curr).filter(
        next => $.grid.at(grid, next.coords)?.length === 0
      )
    },
  }).end.time

// Unfortunately I could not solve part 1 of this puzzle without help. I did
// manage to cross the maze successfully (which is something!) but I couldn’t
// find the shortest path (347 instead of 247).
export const maze = (input: string[], withSnacks: boolean = false) => {
  const startCoords: Coords = [0, findDoor(input[0])]
  const endCoords: Coords = [input.length - 1, findDoor(input.at(-1)!)]
  const grids = getGrids(input)
  const time = cross(grids, startCoords, endCoords)

  return withSnacks
    ? cross(
        grids,
        startCoords,
        endCoords,
        cross(grids, endCoords, startCoords, time)
      )
    : time
}
