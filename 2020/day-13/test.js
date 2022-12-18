const test = require('ava')
const { getNextDeparture, getEarliestTimestamp } = require('.')
const product = require('../../helpers/product')
const input = require('../../helpers/readInput')(__dirname)

test('Day 13 — Sample', t => {
  t.is(product(getNextDeparture('939\n7,13,x,x,59,x,31,19'.split('\n'))), 295)
  t.is(getEarliestTimestamp('\n7,13'.split('\n')), 77)
  t.is(getEarliestTimestamp('\n7,13,x'.split('\n')), 77)
  t.is(getEarliestTimestamp('\n7,13,x,x,59'.split('\n')), 350)
  t.is(getEarliestTimestamp('\n7,13,x,x,59,x,31,19'.split('\n')), 1068781)
  t.is(getEarliestTimestamp('\n17,x,13,19'.split('\n')), 3417)
  t.is(getEarliestTimestamp('\n67,7,59,61'.split('\n')), 754018)
  t.is(getEarliestTimestamp('\n67,x,7,59,61'.split('\n')), 779210)
  t.is(getEarliestTimestamp('\n67,7,x,59,61'.split('\n')), 1261476)
  t.is(getEarliestTimestamp('\n1789,37,47,1889'.split('\n')), 1202161486)
})

test('Day 13 — Solutions', t => {
  t.is(product(getNextDeparture(input)), 5257)
  t.is(getEarliestTimestamp(input), 538703333547789)
})
