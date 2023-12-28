import test from 'ava'
import $ from '../../helpers'
import { countTailPositions } from './'

test('Day 09 — Sample', t => {
  const sample = $.sample(`
  R 4
  U 4
  L 3
  D 1
  R 4
  D 1
  L 5
  R 2
  `)

  t.is(countTailPositions(sample), 13)
  t.is(countTailPositions(sample, 10), 1)
})

test('Day 09 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(countTailPositions(input), 6087)
  t.is(countTailPositions(input, 10), 2493)
})
