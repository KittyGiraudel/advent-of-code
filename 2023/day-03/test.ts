import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 03 — Sample', t => {
  const sample = $.sample(`
  467..114..
  ...*......
  ..35..633.
  ......#...
  617*......
  .....+.58.
  ..592.....
  ......755.
  ...$.*....
  .664.598..
  `)

  t.is(run(sample), 4361)
  t.is(run(sample, true), 467_835)
})

test('Day 03 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 540_025)
  t.is(run(input, true), 84_584_891)
})
