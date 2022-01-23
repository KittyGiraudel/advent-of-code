const $ = require('../../helpers')

const VECTORS = [
  [-1, 0],
  [0, +1],
  [+1, 0],
  [0, -1],
]

const run = input => {
  const grid = $.grid.create(input)
  const read = ([ri, ci]) => grid?.[ri]?.[ci]?.trim()
  const visited = []
  let position = [0, grid[0].findIndex(v => v === '|')]
  let vector = VECTORS[2]
  let letters = ''

  while (read(position)) {
    position = $.applyVector(position, vector)
    visited.push($.toPoint(position))
    const value = read(position)
    if (/[A-Z]/.test(value)) letters += value

    if (value === '+') {
      const index = $.neighbors
        .bordering(...position)
        .findIndex(
          coords =>
            !visited.includes($.toPoint(coords)) && Boolean(read(coords))
        )
      vector = VECTORS[index]
    }
  }

  return [letters, visited.length]
}

module.exports = { run }
