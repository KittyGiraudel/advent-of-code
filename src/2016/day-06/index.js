const $ = require('../../helpers')

const run = lines => {
  const columns = $.array(lines[0].length).map((_, i) =>
    lines.map(line => line[i])
  )
  const counters = columns.map(column =>
    Object.entries($.count(column)).sort((a, b) => a[1] - b[1])
  )

  return [
    counters.map(counter => counter[0][0]).join(''),
    counters.map(counter => $.peek(counter)[0]).join(''),
  ]
}

module.exports = { run }
