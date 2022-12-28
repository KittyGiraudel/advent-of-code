const test = require('ava')
const $ = require('../../helpers')
const { countIncreases, countWindowIncreases } = require('./')

test('Day 01 — Sample', t => {
  t.is(countIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]), 7)
  t.is(
    countWindowIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]),
    5
  )
})

test('Day 01 — Solutions', t => {
  const input = $.readInput(__dirname).map(Number)

  t.is(countIncreases(input), 1681)
  t.is(countWindowIncreases(input), 1704)
})
