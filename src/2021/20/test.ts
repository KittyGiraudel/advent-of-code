import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { processImage } from './'

test('Day 20 — Sample', () => {
  const sample = $.sample(
    `
  ..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

  #..#.
  #....
  ##..#
  ..#..
  ..###
  `,
    { delimiter: '\n\n' }
  )

  assert.strictEqual(
    $.countInString(processImage(sample[0], sample[1], 2), '#'),
    35
  )
  assert.strictEqual(
    $.countInString(processImage(sample[0], sample[1], 50), '#'),
    3351
  )
})

test('Day 20 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })
  const image2 = processImage(input[0], input[1], 2)
  const image50 = processImage(input[0], input[1], 50)

  assert.strictEqual($.countInString(image2, '#'), 5301)
  assert.strictEqual($.countInString(image50, '#'), 19_492)
})
