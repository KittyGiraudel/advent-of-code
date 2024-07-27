import $ from '../../helpers'

export const run = (lines: string[], part2 = false) => {
  const columns = $.range(lines[0].length).map(ci => $.column(lines, ci))
  const counters = columns.map(column =>
    Object.entries($.frequency(column)).sort((a, b) => a[1] - b[1])
  )

  return part2
    ? counters.map(counter => counter[counter.length - 1][0]).join('')
    : counters.map(counter => counter[0][0]).join('')
}
