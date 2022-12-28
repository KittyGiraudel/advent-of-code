const test = require('ava')
const $ = require('../../helpers')
const { sumLowPointsRisk, getProductOfBiggestBasins } = require('./')

test('Day 09 — Sample', t => {
  const sample = $.sample(`
  2199943210
  3987894921
  9856789892
  8767896789
  9899965678
  `)

  t.is(sumLowPointsRisk(sample), 15)
  t.is(getProductOfBiggestBasins(sample), 1134)
})

test('Day 09 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(sumLowPointsRisk(input), 500)
  t.is(getProductOfBiggestBasins(input), 970200)
})
