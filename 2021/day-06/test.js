const test = require('ava')
const { countFish } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

const sample = `3,4,3,1,2`

test('Day 06 — Sample', t => {
  t.is(countFish(sample, 18), 26)
  t.is(countFish(sample, 80), 5934)
  t.is(countFish(sample, 256), 26984457539)
})

test('Day 06 — Solutions', t => {
  t.is(countFish(input, 80), 363101)
  t.is(countFish(input, 256), 1644286074024)
})
