import $ from '../../helpers'
import { Coords, CoordsAndPoint, Grid } from '../../types'

const TOP = ['|', '7', 'F']
const BOTTOM = ['|', 'L', 'J']
const RIGHT = ['-', '7', 'J']
const LEFT = ['-', 'L', 'F']
const DIRECTIONS = [TOP, RIGHT, BOTTOM, LEFT]
const CHAR_VALIDITY_MAP = {
  '|': [TOP, [], BOTTOM, []],
  '-': [[], RIGHT, [], LEFT],
  '7': [[], [], BOTTOM, LEFT],
  J: [TOP, [], [], LEFT],
  L: [TOP, RIGHT, [], []],
  F: [[], RIGHT, BOTTOM, []],
}

type PipePiece = keyof typeof CHAR_VALIDITY_MAP
type PipeMap = ReturnType<typeof mapOutLoopingPipe>

const resolveStart = (grid: Grid<string>, startCoords: Coords) => {
  const [N, E, S, W] = $.bordering(startCoords, 'COORDS')
    .map(coords => grid.get(coords))
    .map((value, index) => DIRECTIONS[index].includes(value))

  if (N && E) return 'L'
  if (N && S) return '|'
  if (N && W) return 'J'
  if (E && S) return 'F'
  if (E && W) return '-'
  if (S && W) return '7'
}

const getNextPipeNodes = (grid: Grid<string>) => (coords: Coords) =>
  $.bordering(coords, 'COORDS').filter((neighbor, index) => {
    const currValue = grid.get(coords) as PipePiece
    const nextValue = grid.get(neighbor)

    return CHAR_VALIDITY_MAP[currValue][index].includes(nextValue)
  })

const mapOutLoopingPipe = (grid: Grid<string>) => {
  const start = grid.findCoords(v => v === 'S') as Coords
  const getNextNodes = getNextPipeNodes(grid)

  // To avoid having to deal with the cell “S” within BFS, start by replacing
  // the starting point with the relevant tile.
  grid.set(start, resolveStart(grid, start) ?? '')

  // Mapping out the looping pipe means running BFS from the start until we
  // cannot find a new node which means we’re back at the start.
  return $.pathfinding.bfs({ start, toKey: $.toPoint, getNextNodes }).from
}

const scaleUpGrid = (grid: Grid<string>, from: PipeMap) => {
  const scaledUpGrid = new $.Grid(grid.width * 3, grid.height * 3, '.')

  grid.forEach((value, ri, ci) => {
    if (!($.toPoint([ri, ci]) in from)) return '.'

    const coords: Coords = scaleUp([ri, ci])
    const [N, E, S, W] = $.bordering(coords, 'COORDS')

    // A given cell remains itself on the scaled up grid; it’s its surroundings
    // which get updated. For instance:
    // In: L
    // Out:
    //  .|.
    //  .L-
    //  ...
    scaledUpGrid.set(coords, value)
    if (BOTTOM.includes(value)) scaledUpGrid.set(N, '|')
    if (LEFT.includes(value)) scaledUpGrid.set(E, '-')
    if (TOP.includes(value)) scaledUpGrid.set(S, '|')
    if (RIGHT.includes(value)) scaledUpGrid.set(W, '-')
  })

  return scaledUpGrid
}

// Flooding is done by starting from the top-left corner of the grid. Beware: we
// assume that the corner is empty and also that there is empty space pretty
// much all around the looping pipe. This will *not* work properly if the
// looping pipe touches the edges of the grid.
const floodGrid = (grid: Grid<string>, start: Coords = [0, 0]) =>
  $.pathfinding.bfs({
    start,
    getNextNodes: curr =>
      $.bordering(curr, 'COORDS').filter(coords => grid.get(coords) === '.'),
  })

const scaleUp = (coords: Coords) =>
  [coords[0] * 3 + 1, coords[1] * 3 + 1] as Coords

export const run = (input: string[], advanced: boolean = false) => {
  const grid = $.Grid.fromRows<string>(input)
  const pipe = mapOutLoopingPipe(grid)
  const pipeLength = Object.keys(pipe).length

  // For part 1, the further point from the start is on the other side of the
  // looping pipe, which is half the looping pipe length.
  if (!advanced) return pipeLength / 2

  // For part 2, we need to find the amount of cells contained within the
  // looping pipe. In theory, this can be done by subtracting the pipe size plus
  // the area outside of it from the grid area. However, there are enclaves made
  // by the pipe wrapping that are not actually contained within the loop. So
  // the bulk of the problem is finding the amount of enclaves.
  // To do so, we are going to scale up the grid 3 times, and flood both grids
  // from their top-left corner. Then for every empty cell within the normal-
  // size grid which was *not* flooded (potential enclave), we check whether it
  // was flooded in the big grid; if it was, it’s an enclave.
  const { from: flooded } = floodGrid(grid)
  const { from: scaledFlooded } = floodGrid(scaleUpGrid(grid, pipe))
  const floodedSize = Object.keys(flooded).length
  const enclavesCount = grid.count(
    (_, ...coords) =>
      // If the cell does *not* belong to the pipe, and does *not* belong to
      // the outside, but was flooded when scaling up, it is an enclave.
      !($.toPoint(coords) in pipe) &&
      !($.toPoint(coords) in flooded) &&
      $.toPoint(scaleUp(coords)) in scaledFlooded
  )

  // The amount of cells belonging to the loop is the total area of the grid
  // minus the length of the pipe + all flooded cells from the outside + all the
  // enclaves.
  return grid.width * grid.height - (pipeLength + floodedSize + enclavesCount)
}
