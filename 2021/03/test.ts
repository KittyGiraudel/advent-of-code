import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 03 — Sample', t => {
  const sample = $.sample(`
  00100
  11110
  10110
  10111
  10101
  01111
  00111
  11100
  10000
  11001
  00010
  01010
  `)

  t.is(run(sample), 198)
  t.is(run(sample, true), 230)
})

test('Day 03 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 4_103_154)
  t.is(run(input, true), 4_245_351)
})
