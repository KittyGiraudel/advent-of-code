import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { breakWeakness, findWeakness } from './'

test('Day 09 — Sample', () => {
  const sample =
    '35,20,15,25,47,40,62,55,65,95,102,117,150,182,127,219,299,277,309,576'
      .split(',')
      .map(Number)

  assert.strictEqual(findWeakness(sample, 5), 127)
  assert.strictEqual(breakWeakness(sample, 5), 62)
})

test('Day 09 — Solutions', () => {
  const input = $.readInput(import.meta).map(Number)

  assert.strictEqual(findWeakness(input, 25), 41_682_220)
  assert.strictEqual(breakWeakness(input, 25), 5_388_976)
})
