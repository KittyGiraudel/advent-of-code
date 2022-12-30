import test from 'ava'
import $ from '../../helpers'
import { countSandUnits } from './'

test('Day 14 — Sample', t => {
  const sample = $.sample(`
  498,4 -> 498,6 -> 496,6
  503,4 -> 502,4 -> 502,9 -> 494,9
  `)

  t.is(countSandUnits(sample), 24)
  t.is(countSandUnits(sample, true), 93)
})

test('Day 14 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(countSandUnits(input), 655)
  t.is(countSandUnits(input, true), 26484)
})
