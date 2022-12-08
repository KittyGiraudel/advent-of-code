const test = require('ava')
const { countVisibleTrees, getHighestScenicScore } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `30373
25512
65332
33549
35390`.split('\n')

test('Day 8.1', t => {
  t.is(countVisibleTrees(sample), 21)
})

test('Day 8.2', t => {
  t.is(getHighestScenicScore(sample), 8)
})

test('Day 8 — Solutions', t => {
  t.is(countVisibleTrees(input), 1827)
  t.is(getHighestScenicScore(input), 335580)
})
