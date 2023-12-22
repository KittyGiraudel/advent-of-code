import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 21 — Sample', t => {
  const sample = $.sample(
    `
    ...........
    .....###.#.
    .###.##..#.
    ..#.#...#..
    ....#.#....
    .##..S####.
    .##..#...#.
    .......##..
    .##.#.####.
    .##..##.##.
    ...........
    `
  )

  t.is(run(sample), 42)
})

test.skip('Day 21 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 3658)
  // Too high
  t.not(run(input, true), 624686496796191)
  // Too low
  t.not(run(input, true), 591700984542658)
  t.not(run(input, true), 608193713358858)
  // Unknown
  t.not(run(input, true), 624680320982867)
  t.not(run(input, true), 681525230170553)
})
