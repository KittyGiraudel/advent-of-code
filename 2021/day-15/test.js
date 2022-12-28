const test = require('ava')
const $ = require('../../helpers')
const { getLowestRisk } = require('./')

test('Day 15 — Sample', t => {
  const sample = $.sample(`
  1163751742
  1381373672
  2136511328
  3694931569
  7463417111
  1319128137
  1359912421
  3125421639
  1293138521
  2311944581
  `)

  t.is(getLowestRisk(sample), 40)
  t.is(getLowestRisk(sample, 5), 315)
})

test('Day 15 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(getLowestRisk(input), 361)
  // t.is(getLowestRisk(input, 5), 2838)
})
