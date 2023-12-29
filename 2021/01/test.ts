import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 01 — Sample', t => {
  t.is(run([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]), 7)
  t.is(run([199, 200, 208, 210, 200, 207, 240, 269, 260, 263], true), 5)
})

test('Day 01 — Solutions', t => {
  const input = $.readInput(import.meta).map(Number)

  t.is(run(input), 1681)
  t.is(run(input, true), 1704)
})
