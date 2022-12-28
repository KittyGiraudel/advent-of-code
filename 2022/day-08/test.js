const test = require('ava')
const $ = require('../../helpers')
const { countVisibleTrees, getHighestScenicScore } = require('./')

test('Day 08 — Sample', t => {
  const sample = $.sample(`
  30373
  25512
  65332
  33549
  35390
  `)

  t.is(countVisibleTrees(sample), 21)
  t.is(getHighestScenicScore(sample), 8)
})

test('Day 08 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(countVisibleTrees(input), 1827)
  t.is(getHighestScenicScore(input), 335580)
})
