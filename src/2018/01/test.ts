import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { find } from './'

test('Day 01 — Sample', () => {
  assert.strictEqual(find([+1, -1]), 0)
  assert.strictEqual(find([+3, +3, +4, -2, -4]), 10)
  assert.strictEqual(find([-6, +3, +8, +5, -6]), 5)
  assert.strictEqual(find([+7, +7, -2, -7, -4]), 14)
})

test('Day 01 — Solutions', () => {
  const input = $.readInput(import.meta).map(Number)

  assert.strictEqual($.sum(input), 406)
  assert.strictEqual(find(input), 312)
})
