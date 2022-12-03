const test = require('ava')
const { run } = require('./')

test('Day 12.1', t => {
  t.is(run('abc'), 22728)
})

test.skip('Day 12.2', t => {})

test('Day 12 — Solutions', t => {
  t.is(run('jlmsuwbz'), 35186)
})
