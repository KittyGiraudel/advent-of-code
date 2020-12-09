const test = require('ava')
const { findWeakness, breakWeakness } = require('./')
const numbers = require('../helpers/readInput')(__dirname).map(Number)

test('Day 9.1', t => {
  const data = '35,20,15,25,47,40,62,55,65,95,102,117,150,182,127,219,299,277,309,576'
    .split(',')
    .map(Number)
  t.is(findWeakness(data, 5), 127)
})

test('Day 9.2', t => {
  const data = '35,20,15,25,47,40,62,55,65,95,102,117,150,182,127,219,299,277,309,576'
    .split(',')
    .map(Number)
  t.is(breakWeakness(data, 5), 62)
})

test('Day 9 — Solutions', t => {
  t.is(findWeakness(numbers, 25), 41682220)
  t.is(breakWeakness(numbers, 25), 5388976)
})
