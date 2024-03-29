import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 05 — Sample', t => {
  const sample = $.sample(`
  0,9 -> 5,9
  8,0 -> 0,8
  9,4 -> 3,4
  2,2 -> 2,1
  7,0 -> 7,4
  6,4 -> 2,0
  0,9 -> 2,9
  3,4 -> 1,4
  0,0 -> 8,8
  5,5 -> 8,2
  `)

  t.is(run(sample), 5)
  t.is(run(sample, true), 12)
})

test('Day 05 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 7269)
  t.is(run(input, true), 21_140)
})
