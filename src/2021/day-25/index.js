const $ = require('../../helpers')

const step = grid => {
  const horizontal = $.gridMap(grid, () => '.')

  $.gridForEach(grid, (v, ri, ci) => {
    if (v !== '>') return
    const right = ci === grid[ri].length - 1 ? 0 : ci + 1
    const canMove = grid[ri][right] === '.'
    horizontal[ri][canMove ? right : ci] = '>'
  })

  const vertical = $.createGrid(serialize(horizontal).split('\n'))

  $.gridForEach(grid, (v, ri, ci) => {
    if (v !== 'v') return
    const bottom = ri === grid.length - 1 ? 0 : ri + 1
    const canMove = grid[bottom][ci] !== 'v' && horizontal[bottom][ci] === '.'
    vertical[canMove ? bottom : ri][ci] = 'v'
  })

  return vertical
}

const serialize = grid => grid.map(row => row.join('')).join('\n')

const steps = (input, count) =>
  Array.from({ length: count }).reduce(acc => step(acc), $.createGrid(input))

const run = input => {
  let curr = $.createGrid(input)
  let next = step(curr)
  let i = 1

  while (serialize(curr) !== serialize(next)) {
    curr = next
    next = step(curr)
    i++
  }

  return i
}

module.exports = { steps, step, run, serialize }
