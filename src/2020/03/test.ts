import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { getResult, getTreeCountForSlope } from './'

test('Day 03 — Sample', () => {
  const example = $.sample(`
  ..##.......
  #...#...#..
  .#....#..#.
  ..#.#...#.#
  .#...##..#.
  ..#.##.....
  .#.#.#....#
  .#........#
  #.##...#...
  #...##....#
  .#..#...#.#
  `)

  assert.strictEqual(getTreeCountForSlope(example, [1, 1]), 2)
  assert.strictEqual(getTreeCountForSlope(example, [3, 1]), 7)
  assert.strictEqual(getTreeCountForSlope(example, [5, 1]), 3)
  assert.strictEqual(getTreeCountForSlope(example, [7, 1]), 4)
  assert.strictEqual(getTreeCountForSlope(example, [1, 2]), 2)
  assert.strictEqual(
    getResult(example, [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ]),
    336
  )
})

test('Day 03 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(getTreeCountForSlope(input, [3, 1]), 218)
  assert.strictEqual(
    getResult(input, [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ]),
    3_847_183_340
  )
})
