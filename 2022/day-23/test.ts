import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 23 — Sample', t => {
  const sample = $.sample(`
  ....#..
  ..###.#
  #...#.#
  .#...##
  #.###..
  ##.#.##
  .#..#..
  `)

  t.is(run(sample), 110)
  t.is(run(sample, Infinity), 20)
})

test('Day 23 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 4249)
  t.is(run(input, Infinity), 980)
})
