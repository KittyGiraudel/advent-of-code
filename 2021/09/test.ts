import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 09 — Sample', t => {
  const sample = $.sample(`
  2199943210
  3987894921
  9856789892
  8767896789
  9899965678
  `)

  t.is(run(sample), 15)
  t.is(run(sample, true), 1134)
})

test('Day 09 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 500)
  t.is(run(input, true), 970_200)
})
