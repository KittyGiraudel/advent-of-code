import test from 'ava'
import $ from '../../helpers'
import { cycle, cycle2 } from './'

test('Day 16 — Sample', t => {
  t.is(cycle('12345678', 1), '48226158')
  t.is(cycle('12345678', 2), '34040438')
  t.is(cycle('12345678', 3), '03415518')
  t.is(cycle('12345678', 4), '01029498')
})

test('Day 16 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(cycle(input, 100).slice(0, 8), '29956495')
  t.is(cycle2(input.repeat(10_000), 100), '73556504')
})
