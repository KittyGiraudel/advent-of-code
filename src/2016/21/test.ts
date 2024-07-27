import test from 'ava'
import $ from '../../helpers'
import { run, run2 } from './'

test('Day 21 — Sample', t => {
  const sample = $.sample(`
  swap position 4 with position 0
  swap letter d with letter b
  reverse positions 0 through 4
  rotate left 1 step
  move position 1 to position 4
  move position 3 to position 0
  rotate based on position of letter b
  rotate based on position of letter d
  `)

  t.is(run(sample, 'abcde'), 'decab')
})

test('Day 21 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input, 'abcdefgh'), 'gfdhebac')
  t.is(run2(input), 'dhaegfbc')
})
