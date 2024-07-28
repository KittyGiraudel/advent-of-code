import assert from 'node:assert'
import test from 'node:test'
import { run } from '.'
import $ from '../../helpers'

test('Day 14 — Sample', () => {
  const example = $.sample(`
  mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
  mem[8] = 11
  mem[7] = 101
  mem[8] = 0
  `)
  assert.strictEqual(run(example), 165)
  const example2 = $.sample(`
  mask = 000000000000000000000000000000X1001X
  mem[42] = 100
  mask = 00000000000000000000000000000000X0XX
  mem[26] = 1
  `)
  assert.strictEqual(run(example2, true), 208)
})

test('Day 14 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 15_172_047_086_292)
  assert.strictEqual(run(input, true), 4_197_941_339_968)
})
