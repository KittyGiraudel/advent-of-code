import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 13 — Sample', () => {
  const sample = $.sample(
    `
    #.##..##.
    ..#.##.#.
    ##......#
    ##......#
    ..#.##.#.
    ..##..##.
    #.#.##.#.

    #...##..#
    #....#..#
    ..##..###
    #####.##.
    #####.##.
    ..##..###
    #....#..#
    `,
    { delimiter: '\n\n' }
  )

  const sample2 = $.sample(
    `
    ...##.....#..##
    ..#..#.....#...
    ##.##.##.#..#..
    ..#..#...##..##
    ..........##...
    ..#..#..##..#..
    #......###.#...
    #..##..#..#.###
    ........#.#....
    ##....##.#.##..
    ##.##.###.#..##
    ##....###.##.##
    #.####.#.#..#..
    .######...##...
    ...##..##..#.##
    .##..##.#.###..
    .#....#.##.##..
    `,
    { delimiter: '\n\n' }
  )

  assert.strictEqual(run(sample), 405)
  assert.strictEqual(run(sample2), 14)
  assert.strictEqual(run(sample, true), 400)
})

test('Day 13 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })
  assert.strictEqual(run(input), 37_718)
  assert.strictEqual(run(input, true), 40_995)
})
