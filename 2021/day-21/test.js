const test = require('ava')
const { playDeterministically, playQuantum } = require('./')

test('Day 21 — Sample', t => {
  t.is(playDeterministically(4, 8).value, 739785)
  t.is(playQuantum(4, 8), 444356092776315)
})

test('Day 21 — Solutions', t => {
  t.is(playDeterministically(4, 5).value, 864900)
  t.is(playQuantum(4, 5), 575111835924670)
})
