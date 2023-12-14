import test from 'ava'
import { resolve, resolve2 } from './'

test('Day 03 — Sample', t => {
  t.is(resolve(1024), 31)
  t.is(resolve2(1024), 1968)
})

test('Day 03 — Solutions', t => {
  t.is(resolve(361_527), 326)
  t.is(resolve2(361_527), 363_010)
})
