import test from 'ava'
import { computeFuelCost, computeIterativeFuelCost } from './'
import $ from '../../helpers'

test('Day 01 — Sample', t => {
  t.is(computeFuelCost(12), 2)
  t.is(computeFuelCost(14), 2)
  t.is(computeFuelCost(1969), 654)
  t.is(computeFuelCost(100756), 33583)
  t.is(computeIterativeFuelCost(14), 2)
  t.is(computeIterativeFuelCost(1969), 966)
})

test('Day 01 — Solutions', t => {
  const numbers = $.readInput(import.meta).map(Number)

  t.is($.sum(numbers.map(computeFuelCost)), 3330521)
  t.is($.sum(numbers.map(computeIterativeFuelCost)), 4992931)
})
