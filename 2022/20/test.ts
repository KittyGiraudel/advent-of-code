import test from 'ava'
import $ from '../../helpers'
import { mix } from './'

test('Day 20 — Sample', t => {
  const sample = [1, 2, -3, 3, -2, 0, 4]

  t.is(mix(sample, 1, 1), 3)
  t.is(mix(sample, 10, 811_589_153), 1_623_178_306)
})

test('Day 20 — Solutions', t => {
  const input = $.readInput(import.meta).map(Number)

  t.is(mix(input), 13_522)
  t.is(mix(input, 10, 811_589_153), 17_113_168_880_158)
})
