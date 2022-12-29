import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 23 — Sample', t => {
  const sample = $.sample(`
  inc a
  jio a, +2
  tpl a
  inc a
  `)

  t.is(run(sample).a, 2)
})

test('Day 23 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input).b, 307)
  t.is(run(input, 1).b, 160)
})
