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
  grid[0].forEach((value, ci) => {
    if (value !== '.') return
    const coords = [0, ci] as Coords
    const door = input[0][ci + 2] + input[1][ci + 2]
    pointsToDoors[$.toPoint(coords)] = door
    doorsToCoords[door] = coords
  })

  // Bottom row
  grid.at(-1)!.forEach((value, ci) => {
    if (value !== '.') return
    const coords = [height - 1, ci] as Coords
    const door = input.at(-2)![ci + 2] + input.at(-1)![ci + 2]
    pointsToDoors[$.toPoint(coords)] = door
    doorsToCoords[door] = coords
  })

  // Left column
  $.column(grid, 0).forEach((value, ri) => {
    if (value !== '.') return
    const coords = [ri, 0] as Coords
    const door = input[ri + 2][0] + input[ri + 2][1]
    pointsToDoors[$.toPoint(coords)] = door
    doorsToCoords[door] = coords
  })

  // Right column
  $.column(grid, width - 1).forEach((value, ri) => {
    if (value !== '.') return
    const coords = [ri, width - 1] as Coords
    const door = input[ri + 2].at(-2)! + input[ri + 2].at(-1)
    pointsToDoors[$.toPoint(coords)] = door
    doorsToCoords[door] = coords
  })

  return { pointsToDoors, doorsToCoords }
}

const getInsideCoords = (grid: Grid<string>) => {
  const pointsToDoors: PointsToDoors = {}
  const doorsToCoords: DoorsToCoords = {}

  $.grid.forEach(grid, (value, ri, ci) => {
    if (!/[A-Z]/.test(value)) return
    const bottom = $.access(grid, [ri + 1, ci]).trim()

    if (/[A-Z]/.test(bottom)) {
      const top = $.access(grid, [ri - 1, ci]).trim()
      const coords = (top ? [ri - 1, ci] : [ri + 2, ci]) as Coords
      const door = value + bottom
      pointsToDoors[$.toPoint(coords)] = door
      doorsToCoords[door] = coords
    }

    const right = $.access(grid, [ri, ci + 1]).trim()

    if (/[A-Z]/.test(right)) {
      const left = $.access(grid, [ri, ci - 1]).trim()
      const coords = (left ? [ri, ci - 1] : [ri, ci + 2]) as Coords
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
      .filter((coords: Coords) => $.access(grid, coords) === '.')
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
      .filter(coords => $.access(grid, coords) === '.')
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
  // This creates a grid from the givein input except without the outside
  // padding. The middle part still contains the inside door names though.
  const grid = $.grid.init(width, height, (ci, ri) => input[ri + 2][ci + 2])
  const outside = getOutsideCoords(grid, input)
  const inside = getInsideCoords(grid)
  const start: Node = { coords: outside.doorsToCoords.AA, depth: 0 }
  const end: Node = { coords: outside.doorsToCoords.ZZ, depth: 0 }
  const toKey = (curr: Node) => $.toPoint(curr.coords) + '/' + curr.depth
  const getNeighbors = recursive ? getNeighborsRecursive : getNeighborsFlat

  const { from } = $.pathfinding.bfs({
    start,
    toKey,
    getNextNodes: getNeighbors(grid, inside, outside),
    isGoal: curr =>
      curr.depth === 0 &&
      curr.coords[0] === end.coords[0] &&
      curr.coords[1] === end.coords[1],
  })

  return $.pathfinding.path(from, toKey(start), toKey(end)).length
}
