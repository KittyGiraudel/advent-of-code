import $ from '../../helpers'

export const run = (input, advanced = false) => {
  const grid = $.grid.init(1000, 1000, 0)

  input.forEach(line => {
    const [xMin, yMin, xMax, yMax] = line.match(/\d+/g).map(Number)

    for (let ri = yMin; ri <= yMax; ri++) {
      for (let ci = xMin; ci <= xMax; ci++) {
        if (line.startsWith('toggle'))
          grid[ri][ci] = advanced ? grid[ri][ci] + 2 : +!grid[ri][ci]
        if (line.startsWith('turn on'))
          grid[ri][ci] = advanced ? grid[ri][ci] + 1 : 1
        if (line.startsWith('turn off'))
          grid[ri][ci] = advanced ? Math.max(grid[ri][ci] - 1, 0) : 0
      }
    }
  })

  return $.grid.reduce(grid, (acc, v) => acc + v, 0)
}
