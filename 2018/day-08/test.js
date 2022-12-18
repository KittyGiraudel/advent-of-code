const test = require('ava')
const { score, parse } = require('./')
const input = require('../../helpers/readInput')(__dirname, ' ').map(Number)

const sample = `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`.split(' ').map(Number)

test('Day 08 — Sample', t => {
  t.is(score(parse(sample.slice(0))), 138)
  t.is(parse(sample.slice(0), true).value, 66)
})

test('Day 08 — Solutions', t => {
  t.is(score(parse(input.slice(0))), 38780)
  t.is(parse(input.slice(0), true).value, 18232)
})
