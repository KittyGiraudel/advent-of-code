import $ from '../../helpers'
import { Coords, CoordsAndPoint, Grid, Point, TriPoint } from '../../types'

const createGraph = (grid: Grid<string>, advanced: boolean = false) => {
  const lookup = grid.toMap()
  const edges: Record<Point, Set<TriPoint>> = {}
  const connect = (from: Coords, to: Coords) => {
    if (!lookup.has($.toPoint(from)) || !lookup.has($.toPoint(to))) return
    const fromPoint = $.toPoint(from)
    if (!(fromPoint in edges)) edges[fromPoint] = new Set()
    edges[fromPoint].add($.toPoint([...to, 1]))
  }

  const isValid = (next: Coords) =>
    !advanced
      ? lookup.get($.toPoint(next)) === '.'
      : lookup.get($.toPoint(next)) !== '#'

  grid.forEach((value, ri, ci) => {
    const coords: Coords = [ri, ci]

    if (value === '.') {
      $.bordering([ri, ci], 'COORDS')
        .filter(isValid)
        .forEach(next => {
          connect(next, coords)
          connect(coords, next)
        })
    } else if (!advanced && value === '>') {
      connect(coords, $.applyVector(coords, [0, +1]))
      connect($.applyVector(coords, [0, -1]), coords)
    } else if (!advanced && value === 'v') {
      connect(coords, $.applyVector(coords, [+1, 0]))
      connect($.applyVector(coords, [-1, 0]), coords)
    }
  })

  // This is taken directly from this solution. Basically, the idea is to trim
  // down the number of nodes by continuously reducing nodes with only 2 edges,
  // connecting them with their neighbors.
  // https://gist.github.com/qwewqa/00d8272766c2945f4aa965ea36dba7f5
  if (advanced) {
    let entry = null
    while ((entry = Object.entries(edges).find(([, set]) => set.size === 2))) {
      const point = entry[0] as Point
      const coords = $.toCoords(point)
      const [a, b] = Array.from(entry[1]).map(value =>
        $.toCoords(value as TriPoint)
      )
      const aWeight = a.pop() as number
      const bWeight = b.pop() as number
      const aCoords = a as unknown as Coords
      const bCoords = b as unknown as Coords

      edges[$.toPoint(aCoords)].delete($.toPoint([...coords, aWeight]))
      edges[$.toPoint(aCoords)].add($.toPoint([...bCoords, aWeight + bWeight]))
      edges[$.toPoint(bCoords)].delete($.toPoint([...coords, bWeight]))
      edges[$.toPoint(bCoords)].add($.toPoint([...aCoords, aWeight + bWeight]))

      delete edges[point as Point]
    }
  }

  return edges
}

const findLongestPath = (
  graph: ReturnType<typeof createGraph>,
  start: Point,
  end: Point
) => {
  const queue: [Point, number][] = [[start, 0]]
  const visited = new Set<Point>()
  let best = 0

  while (queue.length) {
    const [point, dist] = queue.pop()!

    if (dist === -1) {
      visited.delete(point)
      continue
    }

    if (point === end) {
      best = Math.max(best, dist)
      continue
    }

    if (visited.has(point)) continue
    else visited.add(point)

    queue.push([point, -1])
    Array.from(graph[point])!.forEach(value => {
      const [ri, ci, weight] = $.toCoords(value)
      queue.push([$.toPoint([ri, ci] as Coords), dist + weight])
    })
  }

  return best
}

export const run = (input: string[], advanced: boolean = false) => {
  const grid = $.Grid.fromRows<string>(input)
  const { height } = grid
  const startCoords = grid.findCoords((v, ri) => ri === 0 && v === '.')!
  const endCoords = grid.findCoords((v, ri) => ri === height - 1 && v === '.')!
  const graph = createGraph(grid, advanced)

  return findLongestPath(graph, $.toPoint(startCoords), $.toPoint(endCoords))
}
