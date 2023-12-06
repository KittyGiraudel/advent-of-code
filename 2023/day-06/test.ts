import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 06 — Sample', t => {
  const sample = $.sample(`
  Time:      7  15   30
  Distance:  9  40  200
  `)

  t.is(run(sample), 288)
  t.is(run(sample, true), 71503)
})

test('Day 06 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 449820)
  t.is(run(input, true), 42250895)
})
