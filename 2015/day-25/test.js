const test = require('ava')
const { run } = require('./')

test('Day 25 — Solutions', t => {
  t.is(run([2981, 3075]), 9132360)
})
