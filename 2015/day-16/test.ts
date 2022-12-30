import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 16 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 373)
  t.is(run(input, true), 260)
})
