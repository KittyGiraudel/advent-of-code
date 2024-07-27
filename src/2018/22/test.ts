import test from 'ava'
import { run } from './'

test('Day 22 — Sample', t => {
  t.is(run(510, [10, 10]), 114)
  t.is(run(510, [10, 10], true), 45)
})

test('Day 22 — Solutions', t => {
  t.is(run(10_647, [770, 7]), 6208)
  t.is(run(10_647, [770, 7], true), 1039)
})
