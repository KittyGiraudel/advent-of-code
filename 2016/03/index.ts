import $ from '../../helpers'

const isValid = ([a, b, c]: number[]) => a + b > c && a + c > b && b + c > a

export const run = (input: string[], part2: boolean = false) => {
  const rows = input.map($.numbers)
  const columns = $.range(rows[0].length).map(ci => $.column(rows, ci))
  const entries = part2 ? $.chunk(columns.flat(), 3) : rows

  return entries.filter(isValid).length
}
