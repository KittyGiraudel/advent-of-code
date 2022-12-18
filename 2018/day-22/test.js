const test = require('ava')
const { getRisk, getDuration } = require('./')

test('Day 22 — Sample', t => {
  t.is(getRisk(510, [10, 10]), 114)
  t.is(getDuration(510, [10, 10]), 45)
})

test('Day 22 — Solutions', t => {
  t.is(getRisk(10647, [7, 770]), 6208)
  t.is(getDuration(10647, [7, 770]), 1039)
})
