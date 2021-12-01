const test = require('ava')
const { countIncreases, countWindowIncreases } = require('./')
const numbers = require('../../helpers/readInput')(__dirname).map(Number)

test('Day 1.1', t => {
  t.is(countIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]), 7)
})

test('Day 1.2', t => {
  t.is(
    countWindowIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]),
    5
  )
})

test('Day 1 — Solutions', t => {
  t.is(countIncreases(numbers), 1681)
  t.is(countWindowIncreases(numbers), 1704)
})
