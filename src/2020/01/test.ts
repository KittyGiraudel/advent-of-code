import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { findMatches } from './'

test('Day 01 — Sample', () => {
  assert.deepStrictEqual(
    findMatches([1721, 979, 366, 299, 675, 1456], 2),
    [1721, 299]
  )
  assert.deepStrictEqual(
    findMatches([1721, 979, 366, 299, 675, 1456], 3),
    [979, 366, 675]
  )
})

test('Day 01 — Solutions', () => {
  const numbers = $.readInput(import.meta).map(Number)

  assert.strictEqual($.product(findMatches(numbers, 2)), 866_436)
  assert.strictEqual($.product(findMatches(numbers, 3)), 276_650_720)
})
