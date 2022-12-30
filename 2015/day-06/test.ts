import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 06 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 543903)
  t.is(run(input, true), 14687245)
})
