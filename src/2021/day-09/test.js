const test = require('ava')
const { sumLowPointsRisk, getProductOfBiggestBasins } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `2199943210
3987894921
9856789892
8767896789
9899965678`.split('\n')

test('Day 9.1', t => {
  t.is(sumLowPointsRisk(sample), 15)
})

test('Day 9.2', t => {
  t.is(getProductOfBiggestBasins(sample), 1134)
})

test('Day 9 — Solutions', t => {
  t.is(sumLowPointsRisk(input), 500)
  t.is(getProductOfBiggestBasins(input), 970200)
})
