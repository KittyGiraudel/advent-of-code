const $ = require('../../helpers')
const test = require('ava')
const { getGrid, calibrate, scaffold } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test('Day 17.1', t => {
  const grid = $.createGrid(
    `
..#..........
..#..........
#######...###
#.#...#...#.#
#############
..#...#...#..
..#####...^..`
      .trim()
      .split('\n')
  )
  t.is(calibrate(grid), 76)
})

test.skip('Day 17.2', t => {})

test('Day 17 — Solutions', t => {
  t.is(calibrate(getGrid(input)), 4864)
  t.is(scaffold(input), 840248)
})
