import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 02 — Sample', t => {
  const sample = $.sample(`
  forward 5
  down 5
  forward 8
  up 3
  down 8
  forward 2
  `)

  t.is(run(sample), 150)
  t.is(run(sample, true), 900)
})

test('Day 02 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 1_488_669)
  t.is(run(input, true), 1_176_514_794)
})
