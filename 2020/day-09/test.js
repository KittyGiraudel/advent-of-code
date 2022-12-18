const test = require('ava')
const { findWeakness, breakWeakness } = require('./')
const input = require('../../helpers/readInput')(__dirname).map(Number)

const sample =
  '35,20,15,25,47,40,62,55,65,95,102,117,150,182,127,219,299,277,309,576'
    .split(',')
    .map(Number)

test('Day 09 — Sample', t => {
  t.is(findWeakness(sample, 5), 127)
  t.is(breakWeakness(sample, 5), 62)
})

test('Day 09 — Solutions', t => {
  t.is(findWeakness(input, 25), 41682220)
  t.is(breakWeakness(input, 25), 5388976)
})
