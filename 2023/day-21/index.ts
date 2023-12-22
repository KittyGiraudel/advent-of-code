import { PriorityQueue } from '@datastructures-js/priority-queue'
import $ from '../../helpers'
import { Coords, Point } from '../../types'

export const run = (input: string[], advanced: boolean = false) => {
  const grid = $.Grid.fromRows<string>(input)
  const start = grid.findCoords(v => v === 'S')!

  const solve = (maxdist: number) => {
    const { width, height } = grid
    const frontier = new PriorityQueue<[Coords, number]>((a, b) => a[1] - b[1])
    frontier.push([start, 0])
    const visited = new Set<Point>()
    const parity = maxdist % 2
    let result = 0

    while (!frontier.isEmpty()) {
      const [coords, dist] = frontier.pop()!
      const point = $.toPoint(coords)

      if (dist > maxdist) break
      if (visited.has(point)) continue
      else visited.add(point)
      if (dist % 2 === parity) result += 1

      $.bordering(coords, 'COORDS')
        .filter(([ri, ci]) => grid.get([ri % height, ci % width]) !== '#')
        .filter(coords => !visited.has($.toPoint(coords)))
        .forEach(coords => frontier.push([coords, dist + 1]))
    }

    console.log('Solving for', maxdist, '=', result)
    return result
  }

  const steps = 26_501_365
  const mod = steps % grid.height

  console.log('Part 1', solve(64))

  const a = solve(mod)
  const b = solve(mod + grid.width)
  const c = solve(mod + grid.width * 2)

  const first_diff1 = b - a
  const first_diff2 = c - b
  const second_diff = first_diff2 - first_diff1

  const A = Math.floor(second_diff / 2)
  const B = first_diff1 - 3 * A
  const C = a - B - A
  const f = (n: number) => A * n ** 2 + B * n + C

  // const A = (a - 2 * b + c) / 2
  // const B = (-3 * a + 4 * b - c) / 2
  // const C = a
  // const n = Math.round(steps / grid.width)
  // const result = A * n ** 2 + B * n + C
  // console.log('Count', result)

  console.log('Part 2', f(Math.ceil(steps / grid.width)))

  return
}

const input = $.readInput(import.meta)
run(input)
