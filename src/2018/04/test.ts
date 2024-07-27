import test from 'ava'
import $ from '../../helpers'
import { find } from './'

test('Day 04 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(find(input), 4716)
  t.is(find(input, true), 117_061)
})
