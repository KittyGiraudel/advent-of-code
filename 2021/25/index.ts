import $ from '../../helpers'
import type { Grid } from '../../types'

export const step = (grid: Grid<string>) => {
  const horizontal = grid.map<string>(() => '.')

  grid.forEach((value, [ri, ci]) => {
    if (value !== '>') return
    const right = ci === grid.width - 1 ? 0 : ci + 1
    const canMove = grid.get([ri, right]) === '.'
    horizontal.set([ri, canMove ? right : ci], '>')
  })

  const vertical = horizontal.clone()

  grid.forEach((value, [ri, ci]) => {
    if (value !== 'v') return
    const bottom = ri === grid.height - 1 ? 0 : ri + 1
    const canMove =
      grid.get([bottom, ci]) !== 'v' && horizontal.get([bottom, ci]) === '.'
    vertical.set([canMove ? bottom : ri, ci], 'v')
  })

  return vertical
}

export const steps = (input: string[], count: number) =>
  $.array(count).reduce(step, $.Grid.fromRows(input))

export const run = (input: string[]) => {
  let curr = $.Grid.fromRows(input)
  let next = step(curr)
  let i = 1

  while (curr.render() !== next.render()) {
    curr = next
    next = step(curr)
    i++
  }

  return i
}
