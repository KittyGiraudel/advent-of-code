const test = require('ava')
const { countIncreases, countWindowIncreases } = require('./')
const input = require('../../helpers/readInput')(__dirname).map(Number)

test('Day 01 — Sample', t => {
  t.is(countIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]), 7)
  t.is(
    countWindowIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]),
    5
  )
})

test('Day 01 — Solutions', t => {
  t.is(countIncreases(input), 1681)
  t.is(countWindowIncreases(numbers), 1704)
})
