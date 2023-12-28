import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 03 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 862)
  t.is(run(input, true), 1577)
})
