import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 02 — Sample', t => {
  t.is(run(['2x3x4']), 58)
  t.is(run(['2x3x4'], true), 34)
})

test('Day 02 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 1_586_300)
  t.is(run(input, true), 3_737_498)
})
