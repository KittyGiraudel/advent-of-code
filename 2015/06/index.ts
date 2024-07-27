import $ from '../../helpers'
import type { Coords } from '../../types'

export const run = (input: string[], part2 = false) => {
  const grid = new $.Grid(1000, 1000, 0)

  input.forEach(line => {
    const [xMin, yMin, xMax, yMax] = $.numbers(line)

    for (let ri = yMin; ri <= yMax; ri++) {
      for (let ci = xMin; ci <= xMax; ci++) {
        const coords: Coords = [ri, ci]
        const value = grid.get(coords)
        if (line.startsWith('toggle'))
          grid.set(coords, part2 ? value + 2 : +!value)
        if (line.startsWith('turn on')) grid.set(coords, part2 ? value + 1 : 1)
        if (line.startsWith('turn off'))
          grid.set(coords, part2 ? Math.max(value - 1, 0) : 0)
      }
    }
  })

  return grid.reduce((acc, value) => acc + value, 0)
}
