import $ from '../../helpers'
import type {
  Coords,
  CoordsAndPoint,
  Grid,
  Point,
  SearchGraph,
} from '../../types'

const DIRECTIONS = [
  [-1, 0] as Coords,
  [0, +1] as Coords,
  [+1, 0] as Coords,
  [0, -1] as Coords,
]

const pointToPointAndCoords = (point: Point) => ({
  point,
  coords: $.toCoords(point),
})
const coordsToPointAndCoords = (coords: Coords) => ({
  point: $.toPoint(coords),
  coords,
})

function unique<T>(array: T[]) {
  return Array.from(new Set(array))
}

const mapOutRegions = (grid: Grid<string>) => {
  const map = new Map<string, SearchGraph[]>()

  grid.forEach((value, coords) => {
    if (!map.has(value)) map.set(value, [])

    const regions = map.get(value) as SearchGraph[]
    const point = $.toPoint(coords)

    if (!regions.some(region => point in region)) {
      const { graph: region } = $.search.bfs({
        start: point,
        getNext: curr =>
          $.bordering(curr).filter(cell => grid.get(cell) === value),
      })

      regions.push(region)
    }
  })

  return Array.from(map.values()).flat()
}

export const run = (input: string[], part2 = false) => {
  const grid = $.Grid.fromRows(input)
  const regions = mapOutRegions(grid)

  const getPerimeter = (points: Point[]) => {
    const letter = grid.get(points[0])

    if (points.length === 1) return 4
    if (points.length === 1) return 8

    return points.reduce(
      (perimeter, point) =>
        perimeter +
        4 -
        $.bordering(point).filter(cell => grid.get(cell) === letter).length,
      0
    )
  }

  const getSides = (points: Point[]): number => {
    if (points.length === 1) return 4
    if (points.length === 2) return 4

    const cells = points.map(pointToPointAndCoords)
    const start = cells[0]
    const letter = grid.get(start.point)
    const startNeighbors = $.bordering(start)

    const isFromRegion = (cell: CoordsAndPoint) => points.includes(cell.point)
    const isNotFromRegion = (cell: CoordsAndPoint) =>
      !points.includes(cell.point)

    const { path: shoelace } = followWall(
      { position: start, direction: startNeighbors.findIndex(isFromRegion) },
      isFromRegion
    )

    const neighborStartIndex = startNeighbors.findIndex(isNotFromRegion)

    const { rotations: sides } = followWall(
      {
        position: startNeighbors[neighborStartIndex],
        direction: (neighborStartIndex + 1) % 4,
      },
      isNotFromRegion
    )

    const findEnclavesWithinRegion = (cells: CoordsAndPoint[]) => {
      const enclaves: Coords[] = []
      const [minRi, maxRi, minCi, maxCi] = $.boundaries(
        cells.map(cell => cell.coords)
      )

      // To find all enclaves within our current region, we iterate over every
      // cell within the rectangle that contains our entire region.
      for (let ri = minRi; ri <= maxRi; ri++) {
        for (let ci = minCi; ci <= maxCi; ci++) {
          const coords = [ri, ci] as Coords

          // We skip any cell that’s part of our region. So we are processing
          // cells that are either *outside* of it, or *inside* it. The latter
          // are the ones we care about.
          if (grid.get(coords) === letter) continue

          // To figure out whether a cell is outside of the region, we check
          // whether we can reach an edge of the constraining rectangle. If we
          // can, it means this cell is not an enclave.
          const isOutside = $.search.bfs({
            start: coords,
            getNext: curr =>
              $.bordering(curr).filter(cell => grid.get(cell) !== letter),
            isGoal: curr => !grid.get(curr),
          })

          // If we cannot reach an edge, it means this cell belongs to an
          // enclave within our region.
          if (!isOutside.end) enclaves.push([ri, ci])
        }
      }

      return enclaves
    }

    const mergeAdjacentEnclaves = (regions: Point[][]) => {
      const newRegions = [regions[0]].filter(Boolean)

      regions.slice(1).forEach(a => {
        newRegions.forEach(b => {
          const { end } = $.search.bfs({
            start: a[0],
            getNext: curr =>
              $.bordering(curr).filter(cell => grid.get(cell) !== letter),
            isGoal: curr => curr === b[0],
          })
          if (end) b.push(...a)
          else newRegions.push(a)
        })
      })

      return unique(newRegions)
    }

    const enclaves = findEnclavesWithinRegion(shoelace).map(
      coordsToPointAndCoords
    )

    const enclavedCellsRegions = unique(
      enclaves
        .map(cell => regions.find(region => cell.point in region))
        .filter(region => region !== undefined)
    ).map(graph => Object.keys(graph) as Point[])

    const enclaveSides =
      mergeAdjacentEnclaves(enclavedCellsRegions).map(getSides)

    return sides + $.sum(enclaveSides)
  }

  return $.sum(
    regions.map(region => {
      const cells = Object.keys(region) as Point[]
      return cells.length * (part2 ? getSides(cells) : getPerimeter(cells))
    })
  )
}

function followWall(
  start: { position: CoordsAndPoint; direction: number },
  predicate: (cell: CoordsAndPoint) => boolean
) {
  const state = {
    position: start.position,
    direction: start.direction,
    rotations: 0,
    path: [] as CoordsAndPoint[],
  }

  while (
    state.position.point !== start.position.point ||
    state.path.length === 0
  ) {
    state.path.push(state.position)

    const neighbors = $.bordering(state.position)
    const front = neighbors[state.direction]
    const right = neighbors[(state.direction + 1) % 4]

    if (predicate(right)) {
      state.rotations++
      state.direction = state.direction === 3 ? 0 : state.direction + 1
      const next = $.applyVector(
        state.position.coords,
        DIRECTIONS[state.direction]
      )
      state.position = { coords: next, point: $.toPoint(next) }
    } else if (predicate(front)) {
      const next = $.applyVector(
        state.position.coords,
        DIRECTIONS[state.direction]
      )
      state.position = { coords: next, point: $.toPoint(next) }
    } else {
      state.rotations++
      state.direction = state.direction === 0 ? 3 : state.direction - 1
    }
  }

  return {
    ...state,
    rotations: state.rotations,
    path: unique(state.path.map(({ point }) => point)).map(
      pointToPointAndCoords
    ),
  }
}

// My solution _does work_ for all samples and on the input, and I finished the
// day with my code. However, it takes 50 seconds for part 2, which is wild… I
// honestly don’t understand my code so well that I could refactor it, and the
// core logic still somewhat eludes me. This version, reimplemented from one
// found on Reddit, is there just to run part 2 in a decent time. It’s not quite
// my coding style, and I don’t fully get it either, but it’s late so oh well.
// See: https://www.reddit.com/r/adventofcode/comments/1hcdnk0/comment/m1ngr4c/
export const run2 = (input: string[]) => {
  const grid = $.Grid.fromRows(input)

  let total = 0
  const visited = new Set()

  grid.forEach((_, coords) => {
    if (!visited.has($.toPoint(coords))) bfs(coords)
  })

  function bfs(node: Coords) {
    let plotArea = 0
    let edgeCount = 0

    const edges = new Set()
    const value = grid.get(node)
    const queue = [node]

    while (queue.length) {
      const current = queue.shift()!
      const key = $.toPoint(current)

      if (visited.has(key)) continue
      else visited.add(key)

      plotArea += 1

      const neighbors = $.bordering(current)
      const toKey = (polarity: number, coords: Coords) =>
        `${polarity},${$.toPoint(coords)}`

      neighbors.forEach((neighbor, polarity) => {
        if (!grid.get(neighbor) || grid.get(neighbor) !== value) {
          edgeCount += 1
          edges.add(toKey(polarity, neighbor))
          for (const neighbor2 of $.bordering(neighbor))
            if (edges.has(toKey(polarity, neighbor2))) edgeCount -= 1
        } else queue.push(neighbor)
      })
    }

    total += plotArea * edgeCount
  }

  return total
}
