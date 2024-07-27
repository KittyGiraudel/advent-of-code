import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 12 — Sample', t => {
  const sample = $.sample(`
  0 <-> 2
  1 <-> 1
  2 <-> 0, 3, 4
  3 <-> 2, 4
  4 <-> 2, 3, 6
  5 <-> 6
  6 <-> 4, 5
  `)

  t.is(run(sample), 6)
  t.is(run(sample, true), 2)
})

test('Day 12 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 141)
  t.is(run(input, true), 171)
})
