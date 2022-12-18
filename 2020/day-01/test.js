const test = require('ava')
const { findMatches } = require('./')
const product = require('../../helpers/product')
const numbers = require('../../helpers/readInput')(__dirname).map(Number)

test('Day 01 — Sample', t => {
  t.deepEqual(findMatches([1721, 979, 366, 299, 675, 1456], 2), [1721, 299])
  t.deepEqual(findMatches([1721, 979, 366, 299, 675, 1456], 3), [979, 366, 675])
})

test('Day 01 — Solutions', t => {
  t.is(product(findMatches(numbers, 2)), 866436)
  t.is(product(findMatches(numbers, 3)), 276650720)
})
