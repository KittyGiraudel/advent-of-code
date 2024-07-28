import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 03 — Sample', () => {
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

  assert.strictEqual(run(sample), 4361)
  assert.strictEqual(run(sample, true), 467_835)
})

test('Day 03 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 540_025)
  assert.strictEqual(run(input, true), 84_584_891)
})
