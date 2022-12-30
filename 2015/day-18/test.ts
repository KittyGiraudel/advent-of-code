import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 18 — Sample', t => {
  const sample = $.sample(`
  .#.#.#
  ...##.
  #....#
  ..#...
  #.#..#
  ####..
  `)

  t.is(run(sample, 4), 4)
  t.is(run(sample, 5, true), 17)
})

test('Day 18 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input, 100), 1061)
  t.is(run(input, 100, true), 1006)
})
