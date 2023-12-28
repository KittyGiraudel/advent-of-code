import $ from '../../helpers'
import { Coords } from '../../types'

const getGeologicIndex = (
  x: number,
  y: number,
  target: Coords,
  depth: number
): number => {
  if ((x === 0 && y === 0) || (x === target[0] && y === target[1])) return 0
  if (y === 0) return x * 16_807
  if (x === 0) return y * 48_271
  return (
    getErosionLevel(x - 1, y, target, depth) *
    getErosionLevel(x, y - 1, target, depth)
  )
}

const getErosionLevel = $.memo(
  (x: number, y: number, target: Coords, depth: number) =>
    (getGeologicIndex(x, y, target, depth) + depth) % 20_183
)

const getRiskLevel = (x: number, y: number, target: Coords, depth: number) =>
  getErosionLevel(x, y, target, depth) % 3

export const getRisk = (depth: number, target: Coords) =>
  new $.Grid(target[0] + 1, target[1] + 1).reduce(
    (acc, _, ri, ci) => acc + getRiskLevel(ci, ri, target, depth),
    0
  )

const getNeighbors = $.memo(
  (x: number, y: number, width: number, height: number) =>
    $.bordering([x, y]).filter(
      ([x, y]) => x >= 0 && x < width && y >= 0 && y < height
    )
)

export const getDuration = (depth: number, target: Coords) => {
  const height = 5 + (target[1] + 1)
  const width = 50 + (target[0] + 1)
  const frontier: number[][] = [[0, 0, 0, 1]]
  const timeMap: Map<string, number> = new Map()

  while (frontier.length) {
    const [min, x, y, tool] = frontier.shift()!
    const key = $.toPoint([x, y, tool])
    const bestTime = timeMap.get(key) || Infinity

    if (bestTime <= min) {
      continue
    }

    if (target[0] === x && target[1] === y && tool === 1) {
      return min
    }

    timeMap.set(key, min)

    for (let i = 0; i < 3; i++) {
      if (i !== tool && i !== getRiskLevel(x, y, target, depth)) {
        const bestTime = timeMap.get($.toPoint([x, y, i])) || Infinity
        if (bestTime > min + 7) frontier.push([min + 7, x, y, i])
      }
    }

    getNeighbors(x, y, width, height)
      .filter(([x, y]) => getRiskLevel(x, y, target, depth) !== tool)
      .forEach(([x, y]) => {
        const bestTime = timeMap.get($.toPoint([x, y, tool])) || Infinity
        if (bestTime > min + 1) frontier.push([min + 1, x, y, tool])
      })

    let hashes = frontier
      .sort((a, b) => a[0] - b[0])
      .map(([min, ...params]) => $.toPoint(params as Coords))

    // Sort the frontier by time, then keep only the best time for every hash.
    for (let i = 0; i < hashes.length; i++) {
      if (hashes.indexOf(hashes[i]) !== i) frontier.splice(i, 1)
    }
  }
}
