const test = require('ava')
const { getTreeCountForSlope, getResult } = require('./')
const input = require('../../helpers/readInput')(__dirname)

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

test('Day 03 — Sample', t => {
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
