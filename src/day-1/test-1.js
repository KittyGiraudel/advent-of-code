const test = require('ava')
const readInput = require('../helpers/readInput')
const { findMatches, getProduct } = require('./')

const numbers = readInput('./src/day-1/input.txt').map(Number)

test('Day 1.1', t => {
  t.deepEqual(findMatches([1721, 979, 366, 299, 675, 1456], 2), [1721, 299])
})

test('Day 1.2', t => {
  t.deepEqual(findMatches([1721, 979, 366, 299, 675, 1456], 3), [979, 366, 675])
})

test('Day 1 — Solutions', t => {
  t.is(getProduct(numbers, 2), 866436)
  t.is(getProduct(numbers, 3), 276650720)
})
