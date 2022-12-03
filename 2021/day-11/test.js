const test = require('ava')
const { countFlashes, findSynchronocity } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const smallSample = `11111
19991
19191
19991
11111`.split('\n')

const sample = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`.split('\n')

test('Day 11.1', t => {
  t.is(countFlashes(sample, 100), 1656)
})

test('Day 11.2', t => {
  t.is(findSynchronocity(sample), 195)
})

test('Day 11 — Solutions', t => {
  t.is(countFlashes(input, 100), 1661)
  t.is(findSynchronocity(input), 334)
})
