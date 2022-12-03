const test = require('ava')
const { cycle, cycle2 } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test('Day 16.1', t => {
  t.is(cycle('12345678', 1), '48226158')
  t.is(cycle('12345678', 2), '34040438')
  t.is(cycle('12345678', 3), '03415518')
  t.is(cycle('12345678', 4), '01029498')
})

test.skip('Day 16.2', t => {})

test('Day 16 — Solutions', t => {
  t.is(cycle(input, 100).slice(0, 8), '29956495')
  t.is(cycle2(input.repeat(10000), 100), '73556504')
})
