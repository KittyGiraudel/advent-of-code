import test from 'ava'
import $ from '../../helpers'
import { getTreeCountForSlope, getResult } from './'

test('Day 03 — Sample', t => {
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

  t.is(getTreeCountForSlope(example, [1, 1]), 2)
  t.is(getTreeCountForSlope(example, [3, 1]), 7)
  t.is(getTreeCountForSlope(example, [5, 1]), 3)
  t.is(getTreeCountForSlope(example, [7, 1]), 4)
  t.is(getTreeCountForSlope(example, [1, 2]), 2)
  t.is(
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

test('Day 03 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(getTreeCountForSlope(input, [3, 1]), 218)
  t.is(
    getResult(input, [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ]),
    3847183340
  )
})
