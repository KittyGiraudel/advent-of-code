import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 20 — Sample', t => {
  const sample = $.sample(`
  5-8
  0-2
  4-7
  `)

  t.is(run(sample, 9), 3)
  t.is(run(sample, 9, true), 2)
})

test('Day 20 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input, 4294967295), 19449262)
  t.is(run(input, 4294967295, true), 119)
})