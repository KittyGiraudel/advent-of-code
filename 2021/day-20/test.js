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

test('Day 20.1', t => {
  const image = processImage(...sample, 2)
  const lights = $.countInString(image, '#')
  t.is(lights, 35)
})

test('Day 20.2', t => {
  const image = processImage(...sample, 50)
  const lights = $.countInString(image, '#')
  t.is(lights, 3351)
})

test('Day 20 — Solutions', t => {
  const image2 = processImage(...input, 2)
  const image50 = processImage(...input, 50)
  t.is($.countInString(image2, '#'), 5301)
  t.is($.countInString(image50, '#'), 19492)
})
