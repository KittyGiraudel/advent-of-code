import $ from '../../helpers'
import { Coords } from '../../types'

const isOpenSpace =
  (n: number) =>
  ([y, x]: Coords) => {
    if (x < 0 || y < 0) return false

    const value = x * x + 3 * x + 2 * x * y + y + y * y + n
    const bin = $.toBin(value)
    const ones = $.countInString(bin, '1')

    return ones % 2 === 0
  }

export const run = (end: Coords, n: number, advanced: boolean = false) => {
  const start: Coords = [1, 1]
  const { from: graph } = $.pathfinding.bfs({
    start,
    getNextNodes: curr => $.bordering(curr, 'COORDS').filter(isOpenSpace(n)),
    isGoal: ([ri, ci]) => ri === end[0] && ci === end[1],
  })

  const getDistanceFromStart = (from: string | Coords) =>
    $.pathfinding.path(graph, start, from).length

  return advanced
    ? Object.keys(graph)
        .map(getDistanceFromStart)
        .filter(distance => distance <= 50).length
    : getDistanceFromStart(end)
}
