import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 13 — Sample', t => {
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

  t.is(run(sample), 405)
  t.is(run(sample2), 14)
  t.is(run(sample, true), 400)
})

test('Day 13 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })
  t.is(run(input), 37718)
  t.is(run(input, true), 40995)
})
