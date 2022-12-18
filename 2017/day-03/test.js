const test = require('ava')
const { resolve, resolve2 } = require('./')

test('Day 03 — Sample', t => {
  t.is(resolve(1024), 31)
  t.is(resolve2(1024), 1968)
})

test('Day 03 — Solutions', t => {
  t.is(resolve(361527), 326)
  t.is(resolve2(361527), 363010)
})
