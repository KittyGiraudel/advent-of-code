const test = require('ava')
const { run } = require('./')

test('Day 19 — Sample', t => {
  t.is(run(5), 3)
  t.is(run(5, true), 2)
})

test('Day 19 — Solutions', t => {
  t.is(run(3012210), 1830117)
  t.is(run(3012210, true), 1417887)
})
