import $ from '../../helpers'

export const run = (input: string[], part2: boolean = false) => {
  const grid = $.Grid.fromRows(input)
  const start = grid.findCoords(v => v === 'S')

  if (!start) {
    throw new Error('Could not find a start node')
  }

  const solve = (steps: number) => {
    const { width, height } = grid
    const frontier = [start]
    const distances = { [$.toPoint(start)]: 0 }

    while (frontier.length) {
      const curr = frontier.pop()
      if (!curr) break

      $.bordering(curr)
        .filter(([ri, ci]) => grid.get([ri % height, ci % width]) !== '#')
        .filter(coords => !($.toPoint(coords) in distances))
        .forEach(coords => {
          distances[$.toPoint(coords)] = 1 + distances[$.toPoint(curr)]
          if (distances[$.toPoint(coords)] + 1 <= steps)
            frontier.unshift(coords)
        })
    }

    const values = Object.values(distances)
    const result = values.filter(v => v <= steps && v % 2 === steps % 2).length
    // console.log('Solving for', steps, '=', result)

    return result
  }

  if (!part2) return solve(64)

  const steps = 26_501_365
  const remainder = steps % grid.width

  const a = solve(remainder)
  const b = solve(remainder + grid.width)
  const c = solve(remainder + grid.width * 2)

  // const fdiff1 = b - a
  // const fdiff2 = c - b
  // const second_diff = fdiff2 - fdiff1
  // const A = Math.floor(second_diff / 2)
  // const B = fdiff1 - 3 * A
  // const C = a - B - A
  // const f = (n: number) => A * n ** 2 + B * n + C

  const A = (a - 2 * b + c) / 2
  const B = (-3 * a + 4 * b - c) / 2
  const C = a
  const n = Math.ceil(steps / grid.width)
  const result = A * n ** 2 + B * n + C
  console.log('Count', result)

  // console.log('Part 2 (ceil)', f(Math.ceil(steps / grid.width)))
  // console.log('Part 2 (floor)', f(Math.floor(steps / grid.width)))
  // console.log('Part 2 (round)', f(Math.round(steps / grid.width)))

  return result // f(Math.ceil(steps / grid.width))
}
