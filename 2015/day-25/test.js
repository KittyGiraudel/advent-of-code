const test = require('ava')
const { run } = require('./')

test.skip('Day 25 — Sample', t => {})

test('Day 25 — Solutions', t => {
  t.is(run([2981, 3075]), 9132360)
})
