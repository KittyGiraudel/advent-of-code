const test = require('ava')
const readInput = require('../helpers/readInput')
const { getTreeCountForSlope, getResult } = require('./')

const input = readInput('./src/day-3/input.txt')

const example = `
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
`
  .trim()
  .split('\n')

test('Day 3.1', t => {
  t.is(getTreeCountForSlope(example, [1, 1]), 2)
  t.is(getTreeCountForSlope(example, [3, 1]), 7)
  t.is(getTreeCountForSlope(example, [5, 1]), 3)
  t.is(getTreeCountForSlope(example, [7, 1]), 4)
  t.is(getTreeCountForSlope(example, [1, 2]), 2)
})

test('Day 3.2', t => {
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

test('Day 3 — Solutions', t => {
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
