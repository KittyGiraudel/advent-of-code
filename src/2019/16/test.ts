import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { cycle, cycle2 } from './'

test('Day 16 — Sample', () => {
  assert.strictEqual(cycle('12345678', 1), '48226158')
  assert.strictEqual(cycle('12345678', 2), '34040438')
  assert.strictEqual(cycle('12345678', 3), '03415518')
  assert.strictEqual(cycle('12345678', 4), '01029498')
})

test('Day 16 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(cycle(input, 100).slice(0, 8), '29956495')
  assert.strictEqual(cycle2(input.repeat(10_000), 100), '73556504')
})
