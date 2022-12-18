const $ = require('../../helpers')
const test = require('ava')
const { getGrid, calibrate, scaffold } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test('Day 17 — Sample', t => {
  const grid = $.grid.create(
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

test('Day 17 — Solutions', t => {
  t.is(calibrate(getGrid(input)), 4864)
  t.is(scaffold(input), 840248)
})
