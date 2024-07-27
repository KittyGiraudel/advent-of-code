import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 23 — Sample', t => {
  const sample = $.sample(
    `
#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
  `
  )

  t.is(run(sample), 12521)
  t.is(run(sample, true), 44169)
})

test('Day 23 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 16508)
  t.is(run(input, true), 43626)
})
