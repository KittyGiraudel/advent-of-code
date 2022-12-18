const $ = require('../../helpers')
const fs = require('fs')
const test = require('ava')
const { processImage } = require('./')
const input = require('../../helpers/readInput')(__dirname, '\n\n')

const sample =
  `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`.split('\n\n')

test('Day 20 — Sample', t => {
  t.is($.countInString(processImage(...sample, 2), '#'), 35)
  t.is($.countInString(processImage(...sample, 50), '#'), 3351)
})

test('Day 20 — Solutions', t => {
  const image2 = processImage(...input, 2)
  const image50 = processImage(...input, 50)
  t.is($.countInString(image2, '#'), 5301)
  t.is($.countInString(image50, '#'), 19492)
})
