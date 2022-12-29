import test from 'ava'
import $ from '../../helpers'
import { discover } from './'

test('Day 24 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(discover(input), 502)
  t.is(discover(input, true), 724)
})
