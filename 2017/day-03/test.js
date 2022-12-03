const test = require('ava')
const { resolve, resolve2 } = require('./')

test('Day 3.1', t => {
  t.is(resolve(1024), 31)
})

test('Day 3.2', t => {
  t.is(resolve2(1024), 1968)
})

test('Day 3 — Solutions', t => {
  t.is(resolve(361527), 326)
  t.is(resolve2(361527), 363010)
})
