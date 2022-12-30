import test from 'ava'
import $ from '../../helpers'
import { plot } from './'

test('Day 10 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(plot(input), 10312)
})
