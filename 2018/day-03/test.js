import test from 'ava'
import $ from '../../helpers'
import { countOverlappingInches, detect } from './'

test('Day 03 — Sample', t => {
  const sampleA = $.sample(`
  #1 @ 1,3: 4x4
  #2 @ 3,1: 4x4
  #3 @ 5,5: 2x2
  `)

  t.is(countOverlappingInches(sampleA), 4)
})

test('Day 03 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(countOverlappingInches(input), 114946)
  t.is(detect(input), 877)
})
