const test = require('ava')
const { getLowestRisk } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`.split('\n')

test('Day 15.1', t => {
  t.is(getLowestRisk(sample), 40)
})

test('Day 15.2', t => {
  t.is(getLowestRisk(sample, 5), 315)
})

test('Day 15 — Solutions', t => {
  t.is(getLowestRisk(input), 361)
  t.is(getLowestRisk(input, 5), 2838)
})
