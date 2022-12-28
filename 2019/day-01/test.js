const test = require('ava')
const { computeFuelCost, computeIterativeFuelCost } = require('./')
const $ = require('../../helpers')

test('Day 01 — Sample', t => {
  t.is(computeFuelCost(12), 2)
  t.is(computeFuelCost(14), 2)
  t.is(computeFuelCost(1969), 654)
  t.is(computeFuelCost(100756), 33583)
  t.is(computeIterativeFuelCost(14), 2)
  t.is(computeIterativeFuelCost(1969), 966)
})

test('Day 01 — Solutions', t => {
  const numbers = $.readInput(__dirname).map(Number)

  t.is($.sum(numbers.map(computeFuelCost)), 3330521)
  t.is($.sum(numbers.map(computeIterativeFuelCost)), 4992931)
})
