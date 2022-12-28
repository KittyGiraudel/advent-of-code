const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 24 — Sample', t => {
  const sample = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]

  t.is(run(sample, 3), 99)
  t.is(run(sample, 4), 44)
})

test('Day 24 — Solutions', t => {
  const input = $.readInput(__dirname).map(Number)

  t.is(run(input, 3), 10439961859)
  t.is(run(input, 4), 72050269)
})
