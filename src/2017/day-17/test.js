const test = require('ava')
const { run, run2 } = require('./')

test('Day 17.1', t => {
  t.is(run(3, 15), 638)
})

test.skip('Day 17.2', t => {})

test('Day 17 — Solutions', t => {
  t.is(run(394), 926)
  t.is(run2(394), 10150888)
})
