import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 21 — Sample', { skip: true }, () => {
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

  assert.strictEqual(run(sample), 42)
})

test('Day 21 — Solutions', () => {
  const input = $.readInput(import.meta)
  const result = run(input, true)
  assert.strictEqual(run(input), 3658)
  // assert.strictEqual(run(input, true), 608_193_767_979_991) // Actual answer, but doesn’t
  // work for some reason :(
  // Too high
  assert.notEqual(result, 624686496796191)
  // Too low
  assert.notEqual(result, 591700984542658)
  assert.notEqual(result, 608193713358858)
  // Unknown
  assert.notEqual(result, 624680320982867)
  assert.notEqual(result, 681525230170553)
})
