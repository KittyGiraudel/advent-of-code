import test from 'ava'
import { run, run2 } from './'

test('Day 17 — Sample', t => {
  t.is(run(3), 638)
})

test('Day 17 — Solutions', t => {
  t.is(run(394), 926)
  t.is(run2(394), 10_150_888)
})
