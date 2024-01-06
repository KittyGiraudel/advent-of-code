import $ from '../../helpers'
import { Coords } from '../../types'

// The number for each tool corresponds to the region type where that tool is
// **not** allowed. For instance, the torch is not allowed in wet regions, which
// have an erosion level with a remainder of 1 — so the number for the torch is
// 1. This mapping makes some code easier later on.
const NEITHER = 0
const TORCH = 1
const CLIMBING_GEAR = 2
const TOOLS = [NEITHER, TORCH, CLIMBING_GEAR] as const

const getErosionLevel = $.memo(
  (coords: Coords, target: Coords, depth: number): number =>
    (getGeologicIndex(coords, target, depth) + depth) % 20_183
)

const getGeologicIndex = (
  [ri, ci]: Coords,
  target: Coords,
  depth: number
): number => {
  if (ri === 0 && ci === 0) return 0
  if (ri === target[0] && ci === target[1]) return 0
  if (ri === 0) return ci * 16_807
  if (ci === 0) return ri * 48_271
  return (
    getErosionLevel([ri, ci - 1], target, depth) *
    getErosionLevel([ri - 1, ci], target, depth)
  )
}

export const run = (depth: number, target: Coords, part2: boolean = false) => {
  let score = 0

  for (let ri = 0; ri <= target[0]; ri++) {
    for (let ci = 0; ci <= target[1]; ci++) {
      score += getErosionLevel([ri, ci], target, depth) % 3
    }
  }

  if (!part2) return score

  type State = {
    time: number
    position: Coords
    tool: (typeof TOOLS)[number]
  }

  const search = $.search.aStar<State>({
    start: { time: 0, position: [0, 0], tool: TORCH },
    toKey: curr => curr.position + ' : ' + curr.tool,
    isGoal: curr =>
      curr.position[0] === target[0] &&
      curr.position[1] === target[1] &&
      curr.tool === TORCH,
    heuristic: curr => $.manhattan(curr.position, target),
    getCost: (curr, next) => next.time - curr.time,
    getNext: curr => {
      const next: State[] = []
      const erosion = getErosionLevel(curr.position, target, depth) % 3

      // Change tool (find the one tool that’s not the current one, and that is
      // allowed in the current region)
      next.push({
        time: curr.time + 7,
        position: curr.position,
        tool: TOOLS.find(tool => tool !== erosion && curr.tool !== tool)!,
      })

      // Move around (but not in negative indices, and not in regions which do
      // not allow the current tool)
      $.bordering(curr.position)
        .filter(([ri, ci]) => ri >= 0 && ci >= 0)
        .filter(next => getErosionLevel(next, target, depth) % 3 !== curr.tool)
        .forEach(position => {
          next.push({ time: curr.time + 1, position, tool: curr.tool })
        })

      return next
    },
  })

  if (!search.end) {
    throw new Error('Could not find end node')
  }

  return search.end.time
}
