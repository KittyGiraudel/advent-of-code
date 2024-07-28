import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { countArrangements, getDifferenceProduct } from './'

test('Day 10 — Sample', () => {
  const a = '16,10,15,5,1,11,7,19,6,12,4'.split(',').map(Number)
  const b =
    '28,33,18,42,31,14,46,20,48,47,24,23,49,45,19,38,39,11,1,32,25,35,8,17,7,9,4,2,34,10,3'
      .split(',')
      .map(Number)

  assert.strictEqual(getDifferenceProduct(a), 35)
  assert.strictEqual(getDifferenceProduct(b), 220)
  assert.strictEqual(countArrangements(a), 8)
  assert.strictEqual(countArrangements(b), 19_208)
})

test('Day 10 — Solutions', () => {
  const input = $.readInput(import.meta).map(Number)

  assert.strictEqual(getDifferenceProduct(input), 3034)
  assert.strictEqual(countArrangements(input), 259_172_170_858_496)
})
