const test = require('ava')
const { get } = require('.')
const input = require('../helpers/readInput')(__dirname).map(Number)
test('Day 15.1', t => {
  t.is(get([0, 3, 6], 2020), 436)
  t.is(get([1, 3, 2], 2020), 1)
  t.is(get([2, 1, 3], 2020), 10)
  t.is(get([1, 2, 3], 2020), 27)
  t.is(get([2, 3, 1], 2020), 78)
  t.is(get([3, 2, 1], 2020), 438)
  t.is(get([3, 1, 2], 2020), 1836)
})

test('Day 15.2', t => {
  t.is(get([0, 3, 6], 30000000), 175594)
})

test('Day 15 — Solutions', t => {
  t.is(get(input, 2020), 289)
  t.is(get(input, 30000000), 1505722)
})
