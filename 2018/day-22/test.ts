import test from 'ava'
import { getRisk, getDuration } from './'

test('Day 22 — Sample', t => {
  t.is(getRisk(510, [10, 10]), 114)
  t.is(getDuration(510, [10, 10]), 45)
})

test('Day 22 — Solutions', t => {
  t.is(getRisk(10_647, [7, 770]), 6208)
  t.is(getDuration(10_647, [7, 770]), 1039)
})
