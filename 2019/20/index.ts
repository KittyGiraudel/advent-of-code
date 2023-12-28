import $ from '../../helpers'
import { Coords, Grid, Point } from '../../types'

type PointsToDoors = Record<Point, string>
type DoorsToCoords = Record<string, Coords>

type Node = { coords: Coords; depth: number }

const getDimensions = (input: string[]) => {
  // The grid is padded by 2 extra rows or columns on each side to make way for
  // the door names, hence the `- 4`. The width is a bit awkward to compute due
  // to the automatic trimming of lines, which is why we pick the max length.
  const height = input.length - 4
  const width = Math.max(...input.map(i => i.length)) - 4

  return { width, height }
}

const getOutsideCoords = (grid: Grid<string>, input: string[]) => {
  const { width, height } = getDimensions(input)
  const pointsToDoors: PointsToDoors = {}
  const doorsToCoords: DoorsToCoords = {}

  // Top row
  grid.row(0).forEach((value, ci) => {
    if (value !== '.') return
    const coords: Coords = [0, ci]
    const door = input[0][ci + 2] + input[1][ci + 2]
    pointsToDoors[$.toPoint(coords)] = door
    doorsToCoords[door] = coords
  })

  // Bottom row
  grid.row(-1).forEach((value, ci) => {
    if (value !== '.') return
    const coords: Coords = [height - 1, ci]
    const door = input.at(-2)![ci + 2] + input.at(-1)![ci + 2]
    pointsToDoors[$.toPoint(coords)] = door
    doorsToCoords[door] = coords
  })

  // Left column
  grid.column(0).forEach((value, ri) => {
    if (value !== '.') return
    const coords: Coords = [ri, 0]
    const door = input[ri + 2][0] + input[ri + 2][1]
    pointsToDoors[$.toPoint(coords)] = door
    doorsToCoords[door] = coords
  })

  // Right column
  grid.column(-1).forEach((value, ri) => {
    if (value !== '.') return
    const coords: Coords = [ri, width - 1]
    const door = input[ri + 2].at(-2)! + input[ri + 2].at(-1)
    pointsToDoors[$.toPoint(coords)] = door
    doorsToCoords[door] = coords
  })

  return { pointsToDoors, doorsToCoords }
}

const getInsideCoords = (grid: Grid<string>) => {
  const pointsToDoors: PointsToDoors = {}
  const doorsToCoords: DoorsToCoords = {}

  grid.forEach((value, ri, ci) => {
    if (!/[A-Z]/.test(value)) return
    const bottom = grid.get([ri + 1, ci]).trim()

    if (/[A-Z]/.test(bottom)) {
      const top = grid.get([ri - 1, ci]).trim()
      const coords: Coords = top ? [ri - 1, ci] : [ri + 2, ci]
      const door = value + bottom
      pointsToDoors[$.toPoint(coords)] = door
      doorsToCoords[door] = coords
    }

    const right = grid.get([ri, ci + 1]).trim()

    if (/[A-Z]/.test(right)) {
      const left = grid.get([ri, ci - 1]).trim()
      const coords: Coords = left ? [ri, ci - 1] : [ri, ci + 2]
      const door = value + right
      pointsToDoors[$.toPoint(coords)] = door
      doorsToCoords[door] = coords
    }
  })

  return { pointsToDoors, doorsToCoords }
}

const getNeighborsFlat =
  (
    grid: Grid<string>,
    inside: { pointsToDoors: PointsToDoors; doorsToCoords: DoorsToCoords },
    outside: { pointsToDoors: PointsToDoors; doorsToCoords: DoorsToCoords }
  ) =>
  (curr: Node) => {
    const point = $.toPoint(curr.coords)
    return $.bordering(curr.coords, 'COORDS')
      .filter((coords: Coords) => grid.get(coords) === '.')
      .concat([
        outside.doorsToCoords[inside.pointsToDoors[point]],
        inside.doorsToCoords[outside.pointsToDoors[point]],
      ])
      .filter(Boolean)
      .map((coords: Coords) => ({ coords, depth: curr.depth }))
  }

const getNeighborsRecursive =
  (
    grid: Grid<string>,
    inside: { pointsToDoors: PointsToDoors; doorsToCoords: DoorsToCoords },
    outside: { pointsToDoors: PointsToDoors; doorsToCoords: DoorsToCoords }
  ) =>
  (curr: Node) => {
    const point = $.toPoint(curr.coords)
    const neighbors = $.bordering(curr.coords, 'COORDS')
    const walkable = neighbors
      .filter(coords => grid.get(coords) === '.')
      .map(coords => ({ coords, depth: curr.depth }))

    const insideDoor = inside.pointsToDoors[point]
    const outsideDoor = outside.pointsToDoors[point]

    // If we are facing an inside door, add the outside associated coords and
    // increment the depth by 1 as we’re going deeper.
    if (insideDoor) {
      walkable.push({
        coords: outside.doorsToCoords[insideDoor],
        depth: curr.depth + 1,
      })
    }

    // If we are not on the outermost layer and facing an outside door that’s
    // not AA or ZZ, add the inside associated coords and decrement the depth by
    // 1 as we’re walking back up.
    if (outsideDoor && !['AA', 'ZZ'].includes(outsideDoor) && curr.depth > 0) {
      walkable.push({
        coords: inside.doorsToCoords[outsideDoor],
        depth: curr.depth - 1,
      })
    }

    return walkable
  }

export const maze = (input: string[], recursive: boolean = false) => {
  const { width, height } = getDimensions(input)
  // This creates a grid from the given input except without the outside
  // padding. The middle part still contains the inside door names though.
  const grid = new $.Grid(width, height, (ri, ci) => input[ri + 2][ci + 2])
  const outside = getOutsideCoords(grid, input)
  const inside = getInsideCoords(grid)
  const endCoords = outside.doorsToCoords.ZZ
  const getNeighbors = recursive ? getNeighborsRecursive : getNeighborsFlat

  return $.search
    .bfs<Node>({
      start: { coords: outside.doorsToCoords.AA, depth: 0 },
      toKey: (curr: Node) => $.toPoint(curr.coords) + '/' + curr.depth,
      getNextNodes: getNeighbors(grid, inside, outside),
      isGoal: curr =>
        curr.depth === 0 &&
        curr.coords[0] === endCoords[0] &&
        curr.coords[1] === endCoords[1],
    })
    .getPath().length
}
