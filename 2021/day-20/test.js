import test from 'ava'
import $ from '../../helpers'
import { processImage } from './'

test('Day 20 — Sample', t => {
  const sample = $.sample(
    `
  ..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

  #..#.
  #....
  ##..#
  ..#..
  ..###
  `,
    '\n\n'
  )

  t.is($.countInString(processImage(...sample, 2), '#'), 35)
  t.is($.countInString(processImage(...sample, 50), '#'), 3351)
})

test('Day 20 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })
  const image2 = processImage(...input, 2)
  const image50 = processImage(...input, 50)

  t.is($.countInString(image2, '#'), 5301)
  t.is($.countInString(image50, '#'), 19492)
})
