const test = require('ava')
const { getInclusions, getOverlaps } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`.split('\n')

test('Day 04 — Sample', t => {
  t.is(getInclusions(sample).length, 2)
  t.is(getOverlaps(sample).length, 4)
})

test('Day 04 — Solutions', t => {
  t.is(getInclusions(input).length, 651)
  t.is(getOverlaps(input).length, 956)
})
