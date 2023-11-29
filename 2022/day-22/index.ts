import $ from '../../helpers'
import { Coords, Grid, Point } from '../../types'

const ORIENTATIONS = ['>', 'v', '<', '^']
const WALL = '#'
const SPACE = '.'
const VECTORS: Array<Coords> = [
  [0, +1],
  [+1, 0],
  [0, -1],
  [-1, 0],
]

type NeighborGrid = {
  index: number
  orientation: string
}

type Subgrid = {
  boundaries: [number, number]
  neighbors: NeighborGrid[]
  grid: Grid<string>
}

// This is a hard-coded map for my specific input, so this won’t work for
// anything else, not even the sample: no generic solution today. Note that this
// is only stringified to avoid this array being huge (Prettier) and a pain to
// read. It gets mapped into a proper array of objects immediately.
//
// It contains 6 entries, one for each face of the cube in that specific order:
//    01
//    2
//   34
//   5
//
// Then for each face, it specifies:
// - Its neighboring faces in that specific order: right, bottom, left, top.
//   Each neighbor is ultimately an object with the index of the face (from 0 to
//   5) and the new orientation when entering that face (>, v, <, or ^).
// - Its top-left corner position ([ri, ci]).
// - Its subgrid with coords spreading from 0, 0 to 49, 49.
const getSubgrids = (grid: Grid<string>): Subgrid[] =>
  [
    { neighbors: ['1>', '2v', '3>', '5>'], boundaries: [0, 50] },
    { neighbors: ['4<', '2<', '0<', '5^'], boundaries: [0, 100] },
    { neighbors: ['1^', '4v', '3v', '0^'], boundaries: [50, 50] },
    { neighbors: ['4>', '5v', '0>', '2>'], boundaries: [100, 0] },
    { neighbors: ['1<', '5<', '3<', '2^'], boundaries: [100, 50] },
    { neighbors: ['4^', '1v', '0v', '3^'], boundaries: [150, 0] },
  ].map((face: { neighbors: Array<string>; boundaries: [number, number] }) => {
    const [ri, ci] = face.boundaries

    return {
      boundaries: face.boundaries,
      neighbors: face.neighbors
        .map(neighbor => Array.from(neighbor).map(value => +value || value))
        .map(([index, orientation]) => ({
          index,
          orientation,
        })) as NeighborGrid[],
      grid: grid
        .slice(ri, ri + 50)
        .map(row => row.slice(ci, ci + 50)) as Grid<string>,
    }
  })

export const rotate = (orientation: string, instruction: string): string => {
  const direction = instruction === 'L' ? -1 : +1
  const currIndex = ORIENTATIONS.indexOf(orientation)
  const nextIndex = (currIndex + direction) % ORIENTATIONS.length

  return ORIENTATIONS.at(nextIndex)
}

const getWrapNeighbors = (grid: Grid<string>, ri: number, ci: number) => {
  const findFirstIndex = Boolean
  const findLastIndex = (acc: number, item: string, index: number): number =>
    item ? index : acc
  const row = grid[ri]
  const column = $.column(grid, ci)

  return [
    { adjacent: [ri, ci + 1], wrap: [ri, row.findIndex(findFirstIndex)] },
    { adjacent: [ri + 1, ci], wrap: [column.findIndex(findFirstIndex), ci] },
    { adjacent: [ri, ci - 1], wrap: [ri, row.reduce(findLastIndex, 0)] },
    { adjacent: [ri - 1, ci], wrap: [column.reduce(findLastIndex, 0), ci] },
  ].map(({ adjacent, wrap }: { adjacent: Coords; wrap: Coords }) => {
    if ($.access(grid, adjacent) === '.') return adjacent
    if ($.access(grid, adjacent) === '#') return null
    if ($.access(grid, wrap) === '.') return wrap
    return null
  })
}

const getCubicNeighbors = (grid: Grid<string>, ri: number, ci: number) => {
  return VECTORS.map((vector, i) => {
    const nextPos = $.applyVector([ri, ci], vector)
    const nextValue = $.access(grid, nextPos)

    // If the next position is available, this is easy: return the next
    // position (current position + vector).
    if (nextValue === SPACE) return { position: nextPos }
    // If the next position is a wall, this is easy as well: return null as
    // the movement cannot happen.
    else if (nextValue === WALL) return null
    // If the next position does not exist however, it means we need to change
    // cube face, and things get more complicated.
    else {
      const subgrids = getSubgrids(grid)
      const currSubgrid = subgrids.find(
        ({ boundaries, grid }) =>
          $.isClamped(ri, boundaries[0], boundaries[0] + grid.length - 1) &&
          $.isClamped(ci, boundaries[1], boundaries[1] + grid.length - 1)
      )

      // Which grid we land on depends on both which subgrid we are currently
      // on, and which orientation we’re facing.
      const next = currSubgrid.neighbors[i]
      const { grid: nextSubgrid, boundaries } = subgrids[next.index]
      // Since we’re dealing with a cube, faces are squares so we don’t have to
      // check width and height separately.
      const last = nextSubgrid.length - 1
      // These are the adjusted coords relative to the subgrid.
      const ari = ri % nextSubgrid.length
      const aci = ci % nextSubgrid.length
      const nextCoords: Coords = [0, 0]

      // If we’re entering the next grid from the left (therefore facing right),
      // the column is necessarily the first one. The row depends on the current
      // orientation.
      if (next.orientation === '>') {
        nextCoords[0] = [ari, last - aci, last - ari, aci][i]
        nextCoords[1] = 0
      } else if (next.orientation === 'v') {
        nextCoords[0] = 0
        nextCoords[1] = [last - ari, aci, ari, last - aci][i]
      } else if (next.orientation === '<') {
        nextCoords[0] = [last - ari, aci, ari, last - aci][i]
        nextCoords[1] = last
      } else if (next.orientation === '^') {
        nextCoords[0] = last
        nextCoords[1] = [ari, last - aci, last - ari, aci][i]
      }

      // The next coords are relative to the subgrid, so they need to be
      // adjusted to get the absolute coords in the entire grid. Then provided
      // the position is an empty space, we can return it (along with the new
      // orientation).
      const position = $.applyVector(boundaries, nextCoords)
      const cell = $.access(grid, position)

      if (cell === SPACE) return { position, orientation: next.orientation }
      if (cell === WALL) return null
    }
  })
}

const getNeighbors =
  (grid: Grid<string>, asCube: boolean) =>
  (
    acc: Record<Point, typeof getCubicNeighbors | typeof getWrapNeighbors>,
    _: number,
    ri: number,
    ci: number
  ) => {
    if ($.access(grid, [ri, ci])) {
      acc[$.toPoint([ri, ci])] = asCube
        ? getCubicNeighbors(grid, ri, ci)
        : getWrapNeighbors(grid, ri, ci)
    }

    return acc
  }

export const maze = (input: string, asCube: boolean = false): number => {
  const [map, last] = input.split('\n\n')
  const instructions = last.match(/(\d+|L|R)/g)?.map(v => +v || v) ?? []
  const rows = map.split('\n').filter(Boolean)
  const grid = $.grid.create(rows, v => (v === ' ' ? '' : v))
  const neighborMap = $.grid.reduce(
    grid,
    getNeighbors(grid, asCube),
    {} as Record<Point, typeof getCubicNeighbors | typeof getWrapNeighbors>
  )

  let position: Coords = [
    0,
    grid[0].findIndex((_, ci) => grid[0][ci] === SPACE),
  ]
  let orientation = '>'

  instructions.slice(0).forEach(instruction => {
    if (typeof instruction === 'string') {
      orientation = rotate(orientation, instruction)
    } else {
      for (let i = 0; i < instruction; i++) {
        const neighbors = neighborMap[$.toPoint(position)]
        const next = neighbors[ORIENTATIONS.indexOf(orientation)]
        if (!next) break
        if (Array.isArray(next)) position = next as Coords // Part 1
        else {
          // Part 2
          position = next.position
          if (next.orientation) orientation = next.orientation
        }
        grid[position[0]][position[1]] = orientation
      }
    }
  })

  return (
    (position[0] + 1) * 1000 +
    (position[1] + 1) * 4 +
    ORIENTATIONS.indexOf(orientation)
  )
}
