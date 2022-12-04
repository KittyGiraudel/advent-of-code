const test = require('ava')
const { getInclusions, getOverlaps } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`.split('\n')

test('Day 4.1', t => {
  t.is(getInclusions(sample).length, 2)
})

test('Day 4.2', t => {
  t.is(getOverlaps(sample).length, 4)
})

test('Day 4 — Solutions', t => {
  t.is(getInclusions(input).length, 651)
  t.is(getOverlaps(input).length, 956)
})
