import test from 'ava'
import $ from '../../helpers'
import { getGrid, calibrate, scaffold } from './'

test('Day 17 — Sample', t => {
  const sample = $.sample(
    `
  ..#..........
  ..#..........
  #######...###
  #.#...#...#.#
  #############
  ..#...#...#..
  ..#####...^..
  `
  ).map(row => Array.from(row))

  t.is(calibrate(sample), 76)
})

test('Day 17 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(calibrate(getGrid(input)), 4864)
  t.is(scaffold(input), 840_248)
})
