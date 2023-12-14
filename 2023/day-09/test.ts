import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 09 — Sample', t => {
  const sample = $.sample(
    `
    0 3 6 9 12 15
    1 3 6 10 15 21
    10 13 16 21 30 45
    `
  )

  t.is(run(sample), 114)
  t.is(run(sample, true), 2)
})

test('Day 09 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 1_898_776_583)
  t.is(run(input, true), 1100)
})
