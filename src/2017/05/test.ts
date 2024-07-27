import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 05 — Sample', t => {
  const sample = [0, 3, 0, 1, -3]

  t.is(run(sample), 5)
  t.is(run(sample, 3), 10)
})

test('Day 05 — Solutions', t => {
  const input = $.readInput(import.meta).map(Number)

  t.is(run(input), 372_671)
  t.is(run(input, 3), 25_608_480)
})
