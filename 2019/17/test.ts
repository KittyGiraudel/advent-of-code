import test from 'ava'
import $ from '../../helpers'
import { calibrate, getGrid, scaffold } from './'

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
  )

  t.is(calibrate($.Grid.fromRows(sample)), 76)
})

test('Day 17 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(calibrate(getGrid(input)), 4864)
  t.is(scaffold(input), 840_248)
})
