import $ from '../../helpers'
import { Coords } from '../../types'

export const run = (input: string[], advanced: boolean = false) => {
  const grid = $.grid.init(1000, 1000, 0)

  input.forEach(line => {
    const [xMin, yMin, xMax, yMax] = $.numbers(line)

    for (let ri = yMin; ri <= yMax; ri++) {
      for (let ci = xMin; ci <= xMax; ci++) {
        const coords: Coords = [ri, ci]
        const value = $.grid.at(grid, coords)
        if (line.startsWith('toggle'))
          $.grid.set(grid, coords, advanced ? value + 2 : +!value)
        if (line.startsWith('turn on'))
          $.grid.set(grid, coords, advanced ? value + 1 : 1)
        if (line.startsWith('turn off'))
          $.grid.set(grid, coords, advanced ? Math.max(value - 1, 0) : 0)
      }
    }
  })

  return $.grid.reduce(grid, (acc, value) => acc + value, 0)
}
