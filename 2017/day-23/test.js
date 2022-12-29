import test from 'ava'
import $ from '../../helpers'
import { run, skip } from './'

test('Day 23 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 3025)
  t.is(skip(input), 915)
})
