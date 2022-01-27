const test = require('ava')
const { run } = require('./')

test('Day 12.1', t => {
  t.is(run('4,7', 10)[0], 11)
})

test.skip('Day 12.2', t => {})

test('Day 12 — Solutions', t => {
  t.deepEqual(run('39,31', 1364), [86, 127])
})
