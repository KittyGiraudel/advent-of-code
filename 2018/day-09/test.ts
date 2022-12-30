import test from 'ava'
import { play } from './'

test('Day 09 — Sample', t => {
  t.is(play(9, 25), 32)
  t.is(play(17, 1104), 2764)
  t.is(play(10, 1618), 8317)
  t.is(play(21, 6111), 54718)
  t.is(play(30, 5807), 37305)
  t.is(play(13, 7999), 146373)
})

test('Day 09 — Solutions', t => {
  t.is(play(468, 71010), 374287)
  t.is(play(468, 71010 * 100), 3083412635)
})
