const test = require('ava')
const { run } = require('./')

test('Day 14 — Sample', t => {
  t.is(run('abc'), 22728)
})

test('Day 14 — Solutions', t => {
  t.is(run('jlmsuwbz'), 35186)
})
