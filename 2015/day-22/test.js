const test = require('ava')
const { run } = require('./')

test('Day 22 — Solutions', t => {
  t.is(run(false), 900)
  t.is(run(true), 1216)
})
