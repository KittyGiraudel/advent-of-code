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
  let value = null

  // While on the circuit …
  while ((value = read(position))) {
    // … pick up letters we find …
    if (/[A-Z]/.test(value)) letters += value
    // … change direction when hitting a corner …
    if (value === '+') {
      const index = $.neighbors
        .bordering(...position)
        // … by finding the neighboring track that’s not yet visited …
        .findIndex(
          coords =>
            !visited.includes($.toPoint(coords)) && Boolean(read(coords))
        )
      vector = VECTORS[index]
    }

    // … update the position and record the tile as visited.
    position = $.applyVector(position, vector)
    visited.push($.toPoint(position))
  }

  return [letters, visited.length]
}

module.exports = { run }
