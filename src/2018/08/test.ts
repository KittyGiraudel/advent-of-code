import test from 'ava'
import $ from '../../helpers'
import { parse, score } from './'

test('Day 08 — Sample', t => {
  const sample = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]

  t.is(score(parse(sample.slice(0))), 138)
  t.is(parse(sample.slice(0), true).value, 66)
})

test('Day 08 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: ' ' }).map(Number)

  t.is(score(parse(input.slice(0))), 38_780)
  t.is(parse(input.slice(0), true).value, 18_232)
})
