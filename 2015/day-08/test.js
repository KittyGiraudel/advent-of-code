import test from 'ava'
import $ from '../../helpers'
import { decode, encode } from './'

test('Day 08 — Sample', t => {
  const sample = $.readInput(import.meta, '\n', true, 'sample.txt')

  t.is(decode(sample), 12)
  t.is(encode(sample), 19)
})

test('Day 08 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(decode(input), 1350)
  t.is(encode(input), 2085)
})
