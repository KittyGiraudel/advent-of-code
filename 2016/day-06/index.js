import $ from '../../helpers'

export const run = lines => {
  const columns = $.range(lines[0].length).map(i => $.column(lines, i))
  const counters = columns.map(column =>
    Object.entries($.count(column)).sort((a, b) => a[1] - b[1])
  )

  return [
    counters.map(counter => counter[0][0]).join(''),
    counters.map(counter => $.last(counter)[0]).join(''),
  ]
}
