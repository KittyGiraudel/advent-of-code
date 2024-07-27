import test from 'ava'
import { run } from './'

test('Day 03 — Sample', t => {
  t.is(run(1024), 31)
  t.is(run(1024, true), 1968)
})

test('Day 03 — Solutions', t => {
  t.is(run(361_527), 326)
  t.is(run(361_527, true), 363_010)
})
