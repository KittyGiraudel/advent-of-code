const test = require('ava')
const { run } = require('./')

test.skip('Day 21 — Sample', t => {})

test('Day 21 — Solutions', t => {
  t.is(run(false), 900)
  t.is(run(true), 1216)
})
