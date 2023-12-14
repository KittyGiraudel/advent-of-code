import test from 'ava'
import { playDeterministically, playQuantum } from './'

test('Day 21 — Sample', t => {
  t.is(playDeterministically(4, 8).value, 739_785)
  t.is(playQuantum(4, 8), 444_356_092_776_315)
})

test('Day 21 — Solutions', t => {
  t.is(playDeterministically(4, 5).value, 864_900)
  t.is(playQuantum(4, 5), 575_111_835_924_670)
})
