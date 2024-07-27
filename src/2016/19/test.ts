import test from 'ava'
import { run } from './'

test('Day 19 — Sample', t => {
  t.is(run(5), 3)
  t.is(run(5, true), 2)
})

test('Day 19 — Solutions', t => {
  t.is(run(3_012_210), 1_830_117)
  t.is(run(3_012_210, true), 1_417_887)
})
