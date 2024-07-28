import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { calibrate, getGrid, scaffold } from './'

test('Day 17 — Sample', () => {
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

  assert.strictEqual(calibrate($.Grid.fromRows(sample)), 76)
})

test('Day 17 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(calibrate(getGrid(input)), 4864)
  assert.strictEqual(scaffold(input), 840_248)
})
