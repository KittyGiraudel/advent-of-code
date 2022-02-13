const test = require('ava')
const { run } = require('./')

test.skip('Day 21.1', t => {})

test.skip('Day 21.2', t => {})

test('Day 21 — Solutions', t => {
  t.is(run(false), 900)
  t.is(run(true), 1216)
})
