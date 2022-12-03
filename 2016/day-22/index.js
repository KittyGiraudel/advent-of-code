const $ = require('../../helpers')

const run = dump => {
  const nodes = dump.slice(2).map(line => {
    const [, x, y, size, used, available] = line
      .match(/x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)/)
      .map(Number)

    return { coords: [y, x], size, used, available }
  })

  return $.combinations(nodes, 2).filter(
    ([a, b]) =>
      (a.used > 0 && a.used <= b.available) ||
      (b.used > 0 && b.used <= a.available)
  ).length
}

module.exports = { run }
