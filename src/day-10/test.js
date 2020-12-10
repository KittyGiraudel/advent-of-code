const test = require('ava')
const { getDifferenceProduct, countArrangements } = require('./')
const numbers = require('../helpers/readInput')(__dirname).map(Number)

const a = '16,10,15,5,1,11,7,19,6,12,4'.split(',').map(Number)
const b = '28,33,18,42,31,14,46,20,48,47,24,23,49,45,19,38,39,11,1,32,25,35,8,17,7,9,4,2,34,10,3'
  .split(',')
  .map(Number)

test('Day 10.1', t => {
  t.is(getDifferenceProduct(a), 35)
  t.is(getDifferenceProduct(b), 220)
})

test('Day 10.2', t => {
  t.is(countArrangements(a), 8)
  t.is(countArrangements(b), 19208)
})

test('Day 10 — Solutions', t => {
  t.is(getDifferenceProduct(numbers), 3034)
  t.is(countArrangements(numbers), 259172170858496)
})
