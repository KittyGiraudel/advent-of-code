import $ from '../../helpers'
import { Coords, CoordsAndPoint, Point } from '../../types'

type Node = {
  coords: Coords
  keys: Set<string>
  steps: number
}

const isKey = (value: string) => /[a-z]/.test(value)
const isDoor = (value: string) => /[A-Z]/.test(value)

export const maze = (input: string[]) => {
  const keys: Record<Point, string> = {}
  const startCoords: Coords = [0, 0]
  const grid = $.grid.create<string>(input, (value, ri, ci) => {
    if (value === '@') {
      startCoords[0] = ri
      startCoords[1] = ci
      return '.'
    }
    if (isKey(value)) {
      keys[$.toPoint([ri, ci])] = value
      return '.'
    }
    return value
  })
  const keyCount = Object.keys(keys).length
  const start: Node = { coords: startCoords, keys: new Set(), steps: 0 }
  // const frontier: Node[] = [start]

  console.log(keys, startCoords)

  const { from, end } = $.pathfinding.dijkstra({
    start,
    isGoal: curr => curr.keys.size === keyCount,
    toKey: curr => $.toPoint(curr.coords),
    getCost: curr => curr.steps + 1,
    getNextNodes: curr =>
      $.bordering(curr.coords, 'BOTH')
        .filter(next => {
          const value = $.access(grid, next.coords)
          const isOpenDoor = isDoor(value) && curr.keys.has(value.toLowerCase())

          return value === '.' || isOpenDoor
        })
        .map(next => {
          const nextKeys =
            next.point in keys
              ? new Set(curr.keys).add(keys[next.point])
              : curr.keys

          return { coords: next.coords, keys: nextKeys, steps: curr.steps + 1 }
        }),
  })

  console.log(from, end)
  /*
  while (frontier.length) {
    const curr = frontier.pop()

    if (curr.keys.size === keyCount) {
      end = curr
      break
    }

    console.log(curr)

    const neighbors = $.bordering(curr.coords, 'BOTH')
    const available = neighbors.filter((next: CoordsAndPoint) => {
      const value = $.access(grid, next.coords)

      return (
        value === '.' || (isDoor(value) && curr.keys.has(value.toLowerCase()))
      )
    })

    available.forEach((next: CoordsAndPoint) => {
      const nextKeys =
        next.point in keys
          ? new Set(curr.keys).add(keys[next.point])
          : curr.keys

      frontier.unshift({
        coords: next.coords,
        keys: nextKeys,
        steps: curr.steps + 1,
      })
    })
  }

  return end.steps
  */
}

maze(
  $.sample(`
########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################
`)
)
