import $ from '../../helpers'
import type { Coords } from '../../types'

export const run = (input: string[], part2 = false) => {
  const grid = $.Grid.fromRows(input)
  const start = grid.findCoords(value => value === 'S')!
  const end = grid.findCoords(value => value === 'E')!

  grid.set(start, '.')
  grid.set(end, '.')

  const DIRS: Coords[] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  const outcome = $.search.aStar({
    start: { pos: start, score: 0, dir: 1 },
    toKey: curr => $.toPoint(curr.pos) + '.' + curr.dir,
    isGoal: curr => curr.pos[0] === end[0] && curr.pos[1] === end[1],
    heuristic: curr => $.manhattan(end, curr.pos),
    getCost: (curr, next) => next.score - curr.score,
    getNext: ({ pos, dir, score }) => {
      const next = []
      const nextPos = $.applyVector(pos, DIRS[dir])

      if (grid.get(nextPos) === '.') {
        next.push({ pos: nextPos, score: score + 1, dir })
      }

      next.push({ pos, score: score + 1000, dir: (dir + 1) % 4 })
      next.push({ pos, score: score + 1000, dir: (dir + 3) % 4 })

      return next
    },
  })

  function getTiles(lowestScore: number) {
    const queue = [{ pos: start, dir: 1, score: 0, path: [start] }]
    const visited = new Map<string, number>()
    const tiles: Coords[] = []

    while (queue.length) {
      const { pos, dir, score, path } = queue.shift()!
      const key = $.toPoint(pos) + '.' + dir

      if (score > lowestScore) continue
      if (visited.has(key) && visited.get(key)! < score) continue
      visited.set(key, score)

      if (pos[1] === end[1] && pos[0] === end[0] && score === lowestScore) {
        tiles.push(...path)
        continue
      }

      const nextPos = $.applyVector(pos, DIRS[dir])

      if (grid.get(nextPos) === '.') {
        const nextPath = [...path, nextPos]
        queue.push({ pos: nextPos, dir, score: score + 1, path: nextPath })
      }

      queue.push({ pos, score: score + 1000, dir: (dir + 1) % 4, path })
      queue.push({ pos, score: score + 1000, dir: (dir + 3) % 4, path })
    }

    return Array.from(new Set(tiles.map($.toPoint)))
  }

  const score = outcome.end!.score

  return part2 ? getTiles(score).length : score
}
