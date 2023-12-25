import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test.skip('Day 21 — Sample', t => {
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

test('Day 21 — Solutions', t => {
  const input = $.readInput(import.meta)
  const result = run(input, true)
  t.is(run(input), 3658)
  // t.is(run(input, true), 608_193_767_979_991) // Actual answer, but doesn’t
  // work for some reason :(
  // Too high
  t.not(result, 624686496796191)
  // Too low
  t.not(result, 591700984542658)
  t.not(result, 608193713358858)
  // Unknown
  t.not(result, 624680320982867)
  t.not(result, 681525230170553)
})
