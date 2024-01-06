import $ from '../../helpers'
import { Coords } from '../../types'

type Direction = 'U' | 'D' | 'L' | 'R'
const DIRECTIONS: [
  [Coords, Direction],
  [Coords, Direction],
  [Coords, Direction],
  [Coords, Direction]
] = [
  [[0, -1], 'U'],
  [[0, +1], 'D'],
  [[-1, 0], 'L'],
  [[+1, 0], 'R'],
]

type Node = {
  coords: Coords
  path: string
}

export const run = (input: string, longest: boolean = false) => {
  const search = $.search.bfs<Node>({
    start: { coords: [0, 0], path: input },
    emptyAfterGoal: longest,
    isGoal: curr => curr.coords.every(axis => axis === 3),
    toKey: curr => curr.coords.join(',') + ':' + curr.path,
    // Iterate over all 4 bordering directions. If the door is closed, move to
    // the next direction. Otherwise, check whether the coordinates remain
    // within boundaries. If they do, add the new cell to the frontier.
    getNext: curr => {
      const hash = $.md5(curr.path)

      return DIRECTIONS.filter((_, index) => /[bcdef]/.test(hash[index]))
        .map(([vector, direction]) => ({
          coords: $.applyVector(curr.coords, vector),
          path: curr.path + direction,
        }))
        .filter(next => next.coords.every(n => $.isClamped(n, 0, 3)))
    },
  })

  if (!search.end) {
    throw new Error('Could not find end node')
  }

  return search.end.path.replace(input, '')
}
