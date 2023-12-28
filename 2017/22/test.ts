import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 22 — Sample', t => {
  const sample = $.sample(`
  ..#
  #..
  ...
  `)

  t.is(run(sample, 7), 5)
  t.is(run(sample, 70), 41)
  t.is(run(sample, 10_000), 5587)
  t.is(run(sample, 100, true), 26)
  t.is(run(sample, 10_000_000, true), 2_511_944)
})

test('Day 22 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input, 10_000), 5280)
  t.is(run(input, 10_000_000, true), 2_512_261)
})
