const test = require('ava')
const { run } = require('./')

test('Day 15 — Sample', t => {
  t.is(run(65, 8921, 5), 1)
  t.is(run(65, 8921, 40_000_000), 588)
  t.is(run(65, 8921, 1056, 4, 8), 1)
  t.is(run(65, 8921, 5_000_000, 4, 8), 309)
})

test('Day 15 — Solutions', t => {
  t.is(run(277, 349, 40_000_000), 592)
  t.is(run(277, 349, 5_000_000, 4, 8), 320)
})
