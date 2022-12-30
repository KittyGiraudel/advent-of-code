import $ from '../../helpers'
import { Point, Coords } from '../../types'

const DIRECTIONS: [
  [Coords, string],
  [Coords, string],
  [Coords, string],
  [Coords, string]
] = [
  [[0, -1], 'U'],
  [[0, +1], 'D'],
  [[-1, 0], 'L'],
  [[+1, 0], 'R'],
]

type Node = {
  point: Point
  coords: Coords
  path: string
}

export const run = (input: string, longest: boolean = false): string => {
  const frontier: Node[] = [{ point: '0,0', coords: [0, 0], path: input }]
  let path = null

  while (frontier.length) {
    const curr = frontier.pop()

    // If we have reached the end cell, we should stop there if we are looking
    // for the shortest path, or look for other paths if we are looking for the
    // longest path.
    if (curr.point === '3,3') {
      path = curr.path.replace(input, '')
      if (longest) continue
      else break
    }

    const hash = $.md5(curr.path)

    // Iterate over all 4 bordering directions. If the door is closed, move to
    // the next direction. Otherwise, check whether the coordinates remain
    // within boundaries. If they do, add the new cell to the frontier.
    for (let i = 0; i < DIRECTIONS.length; i++) {
      if (!/[bcdef]/.test(hash[i])) {
        continue
      }

      const [vector, direction] = DIRECTIONS[i]
      const next = $.applyVector(curr.coords, vector)

      if (!next.every(n => $.isClamped(n, 0, 3))) {
        continue
      }

      frontier.unshift({
        point: $.toPoint(next),
        coords: next,
        path: curr.path + direction,
      })
    }
  }

  return path
}
