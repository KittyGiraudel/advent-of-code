import test from 'ava'
import { run } from './'

test('Day 21 — Sample', t => {
  t.is(run([4, 8]), 739_785)
  t.is(run([4, 8], true), 444_356_092_776_315)
})

test('Day 21 — Solutions', t => {
  t.is(run([4, 5]), 864_900)
  t.is(run([4, 5], true), 575_111_835_924_670)
})
