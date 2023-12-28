import test from 'ava'
import { play } from './'

test('Day 09 — Sample', t => {
  t.is(play(9, 25), 32)
  t.is(play(17, 1104), 2764)
  t.is(play(10, 1618), 8317)
  t.is(play(21, 6111), 54_718)
  t.is(play(30, 5807), 37_305)
  t.is(play(13, 7999), 146_373)
})

test('Day 09 — Solutions', t => {
  t.is(play(468, 71_010), 374_287)
  t.is(play(468, 71_010 * 100), 3_083_412_635)
})
