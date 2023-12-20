import $ from '../../helpers'

export const run = (
  lines: string[],
  dimensions: [number, number] = [50, 6]
) => {
  const grid = new $.Grid<string>(...dimensions)

  lines.forEach(line => {
    if (line.startsWith('rect')) {
      const [width, height] = $.numbers(line)
      for (let ri = 0; ri < height; ri++)
        for (let ci = 0; ci < width; ci++) grid.set([ri, ci], '#')
    } else {
      const [, type, index, iterations] = $.match(line, /(x|y)=(\w+) by (\w+)/)

      if (type === 'y') {
        $.rotate(grid.row(+index), +iterations)
      } else {
        const column = $.rotate(grid.column(+index), +iterations)
        grid.rows.forEach((row, i) => (row[+index] = column[i]))
      }
    }
  })

  return $.countInString(grid.stringify(), '#')
}
