import test from 'ava'
import $ from '../../helpers'
import { findMatches } from './'

test('Day 01 — Sample', t => {
  t.deepEqual(findMatches([1721, 979, 366, 299, 675, 1456], 2), [1721, 299])
  t.deepEqual(findMatches([1721, 979, 366, 299, 675, 1456], 3), [979, 366, 675])
})

test('Day 01 — Solutions', t => {
  const numbers = $.readInput(import.meta).map(Number)

  t.is($.product(findMatches(numbers, 2)), 866_436)
  t.is($.product(findMatches(numbers, 3)), 276_650_720)
})
