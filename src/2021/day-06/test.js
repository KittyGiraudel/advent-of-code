const test = require('ava')
const { countFish } = require('./')
const input = require('../../helpers/readInput')(__dirname, ',').map(Number)

const sample = `3,4,3,1,2`.split(',').map(Number)

test('Day 6.1', t => {
  t.is(countFish(sample, 18), 26)
  t.is(countFish(sample, 80), 5934)
})

test('Day 6.2', t => {
  t.is(countFish(sample, 256), 26984457539)
})

test('Day 6 — Solutions', t => {
  t.is(countFish(input, 80), 363101)
  t.is(countFish(input, 256), 1644286074024)
})
