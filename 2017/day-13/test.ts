import test from 'ava'
import $ from '../../helpers'
import { run, cross } from './'

test('Day 13 — Sample', t => {
  const sample = $.sample(`
  0: 3
  1: 2
  4: 4
  6: 4
  `)

  t.is(run(sample), 24)
  t.is(cross(sample), 10)
})

test('Day 13 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 1900)
  t.is(cross(input), 3966414)
})
