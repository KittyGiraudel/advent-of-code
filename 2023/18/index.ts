import $ from '../../helpers'
import { Coords } from '../../types'

export const run = (input: string[], part2: boolean = false) => {
  const curr: Coords = [0, 0]
  const vertices: Coords[] = []
  let perimeter = 0

  input.forEach(line => {
    const [direction1, rawSteps, color] = line.split(' ')
    const steps = part2 ? parseInt(color.slice(2, -2), 16) : +rawSteps
    const direction = part2 ? 'RDLU'[+color.at(-2)!] : direction1

    if (direction === 'L') curr[1] -= steps
    if (direction === 'R') curr[1] += steps
    if (direction === 'U') curr[0] -= steps
    if (direction === 'D') curr[0] += steps
    perimeter += steps
    vertices.push([...curr])
  })

  // I solved part 1 the naive way, by performing BFS flood-fill from outside
  // the polygon. It obviously doesn’t work for part 2, and I didn’t know how to
  // solve it. In the end it’s a combination of Pick’s Theorem (below) and the
  // Shoelace Theorem. Being a geometry problem, I would have never figured it
  // out.
  return $.shoelace(vertices) + perimeter / 2 + 1
}
