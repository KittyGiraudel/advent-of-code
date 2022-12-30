import test from 'ava'
import { run } from './'

test('Day 13 — Sample', t => {
  t.is(run([4, 7], 10)[0], 11)
})

test('Day 13 — Solutions', t => {
  t.deepEqual(run([39, 31], 1364), [86, 127])
})
