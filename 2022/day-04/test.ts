import test from 'ava'
import $ from '../../helpers'
import { getInclusions, getOverlaps } from './'

test('Day 04 — Sample', t => {
  const sample = $.sample(`
  2-4,6-8
  2-3,4-5
  5-7,7-9
  2-8,3-7
  6-6,4-6
  2-6,4-8
  `)

  t.is(getInclusions(sample), 2)
  t.is(getOverlaps(sample), 4)
})

test('Day 04 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(getInclusions(input), 651)
  t.is(getOverlaps(input), 956)
})
