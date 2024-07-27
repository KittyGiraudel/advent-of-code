import test from 'ava'
import { run } from '.'
import $ from '../../helpers'

test('Day 14 — Sample', t => {
  const example = $.sample(`
  mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
  mem[8] = 11
  mem[7] = 101
  mem[8] = 0
  `)
  t.is(run(example), 165)
  const example2 = $.sample(`
  mask = 000000000000000000000000000000X1001X
  mem[42] = 100
  mask = 00000000000000000000000000000000X0XX
  mem[26] = 1
  `)
  t.is(run(example2, true), 208)
})

test('Day 14 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 15_172_047_086_292)
  t.is(run(input, true), 4_197_941_339_968)
})
