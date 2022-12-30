import test from 'ava'
import $ from '../../helpers'
import { checksum } from './'

test('Day 02 — Sample', t => {
  const sampleA = $.sample(`
  5 1 9 5
  7 5 3
  2 4 6 8
  `)

  const sampleB = $.sample(`
  5 9 2 8
  9 4 7 3
  3 8 6 5
  `)

  t.is(checksum(sampleA), 18)
  t.is(checksum(sampleB, true), 9)
})

test('Day 02 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(checksum(input), 46402)
  t.is(checksum(input, true), 265)
})
