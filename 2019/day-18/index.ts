import $ from '../../helpers'
import { Coords, CoordsAndPoint, Grid } from '../../types'

type QueueItem = CoordsAndPoint & {
  keys: string[]
  path: string[]
  doors: string[]
}

const isDoorAtCell = (cell: string): boolean => /[A-Z]/.test(cell)
const isKeyAtCell = (cell: string): boolean => /[a-z]/.test(cell)

const createGraph = (grid: Grid<string>, start: CoordsAndPoint, locations) => {
  const count = Object.keys(locations).filter(isKeyAtCell).length
  const frontier = new $.PriorityQueue<QueueItem>([
    { ...start, keys: [], path: [], doors: [] },
    10_000,
  ])

  while (frontier.length) {
    const [curr] = frontier.pop()

    if (curr.keys.length === count) return curr

    $.bordering(curr.coords, 'BOTH')
      .filter(({ coords }: CoordsAndPoint) => {
        const cell = $.access(grid, coords)

        if (isDoorAtCell(cell)) {
          return curr.keys.includes(cell.toLowerCase())
        }

        return cell !== '#'
      })
      .forEach((next: CoordsAndPoint) => {
        const cell = $.access(grid, next.coords)
        const doors = [...curr.doors]
        const keys = [...curr.keys]
        const path = [...curr.path, curr.point]

        if (isKeyAtCell(cell) && !keys.includes(cell)) keys.push(cell)
        if (isDoorAtCell(cell) && !doors.includes(cell)) doors.push(cell)

        let priority = 10_000
        const unmatchedKeys = keys.filter(
          key => !doors.includes(key.toUpperCase())
        )

        if (unmatchedKeys.length) {
          const nextDoor = unmatchedKeys.at(-1).toUpperCase()

          if (nextDoor in locations) {
            priority = $.manhattan(next.coords, locations[nextDoor])
          }
        }

        frontier.push([{ ...next, keys, doors, path }, priority])
      })
  }
}

export const run = (input: string[]): number => {
  const locations: Record<string, Coords> = {}

  const grid = $.grid.create(input, (v, ri, ci) => {
    const isKey = /[a-z]/.test(v)
    const isDoor = /[A-Z]/.test(v)
    const isStart = v === '@'
    if (isKey || isDoor || isStart) locations[v] = [ri, ci]
    return v
  })

  const startCoords = locations['@']
  const start: CoordsAndPoint = {
    coords: startCoords,
    point: $.toPoint(startCoords),
  }
  const graph = createGraph(grid, start, locations)

  return graph.path.length
}
