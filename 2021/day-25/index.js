import $ from '../../helpers'

export const step = grid => {
  const horizontal = $.grid.map(grid, () => '.')

  $.grid.forEach(grid, (v, ri, ci) => {
    if (v !== '>') return
    const right = ci === grid[ri].length - 1 ? 0 : ci + 1
    const canMove = grid[ri][right] === '.'
    horizontal[ri][canMove ? right : ci] = '>'
  })

  const vertical = $.grid.clone(horizontal)

  $.grid.forEach(grid, (v, ri, ci) => {
    if (v !== 'v') return
    const bottom = ri === grid.length - 1 ? 0 : ri + 1
    const canMove = grid[bottom][ci] !== 'v' && horizontal[bottom][ci] === '.'
    vertical[canMove ? bottom : ri][ci] = 'v'
  })

  return vertical
}

export const steps = (input, count) =>
  $.array(count).reduce(step, $.grid.create(input))

export const run = input => {
  let curr = $.grid.create(input)
  let next = step(curr)
  let i = 1

  while ($.grid.render(curr) !== $.grid.render(next)) {
    curr = next
    next = step(curr)
    i++
  }

  return i
}
