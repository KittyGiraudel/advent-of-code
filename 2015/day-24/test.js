const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname).map(Number)

const sample = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]

test('Day 24 — Sample', t => {
  t.is(run(sample, 3), 99)
  t.is(run(sample, 4), 44)
})

test('Day 24 — Solutions', t => {
  t.is(run(input, 3), 10439961859)
  t.is(run(input, 4), 72050269)
})
