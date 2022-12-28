const test = require('ava')
const $ = require('../../helpers')
const { getGrid, calibrate, scaffold } = require('./')

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
  const [input] = $.readInput(__dirname)

  t.is(calibrate(getGrid(input)), 4864)
  t.is(scaffold(input), 840248)
})
