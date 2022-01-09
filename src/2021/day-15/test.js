const test = require('ava')
const { createMegaGrid, getLowestRisk } = require('./')
const $ = require('../../helpers')
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
  t.is(getLowestRisk($.grid.create(sample, Number)), 40)
})

test('Day 15.2', t => {
  t.is(getLowestRisk(createMegaGrid(sample)), 315)
})

test('Day 15 — Solutions', t => {
  t.is(getLowestRisk($.grid.create(input, Number)), 361)
  t.is(getLowestRisk(createMegaGrid(input)), 2838)
})
