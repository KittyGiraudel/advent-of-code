import $ from '../../helpers'

export const run = (
  lines: string[],
  dimensions: [number, number] = [50, 6]
) => {
  const grid = $.grid.init<string>(dimensions[0], dimensions[1])

  lines.forEach(line => {
    if (line.startsWith('rect')) {
      const [width, height] = line.match(/\d+/g)?.map(Number) ?? []
      for (let ri = 0; ri < height; ri++)
        for (let ci = 0; ci < width; ci++) grid[ri][ci] = '#'
    } else {
      const [, type, index, iterations] =
        line.match(/(x|y)=(\w+) by (\w+)/) ?? []

      if (type === 'y') {
        $.rotate(grid[+index], +iterations)
      } else {
        const column = $.rotate($.column(grid, +index), +iterations)
        grid.forEach((row, i) => (row[+index] = column[i]))
      }
    }
  })

  return $.countInString(grid.flat().join(''), '#')
}
