const test = require('ava')
const { countSandUnits } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`.split('\n')

test('Day 14 — Sample', t => {
  t.is(countSandUnits(sample), 24)
  t.is(countSandUnits(sample, true), 93)
})

test('Day 14 — Solutions', t => {
  t.is(countSandUnits(input), 655)
  t.is(countSandUnits(input, true), 26484)
})
