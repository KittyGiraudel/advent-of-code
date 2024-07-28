import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 11 — Sample', () => {
  const sample = $.sample(
    `
    ...#......
    .......#..
    #.........
    ..........
    ......#...
    .#........
    .........#
    ..........
    .......#..
    #...#.....
    `
  )

  assert.strictEqual(run(sample), 374)
  assert.strictEqual(run(sample, 10), 1030)
  assert.strictEqual(run(sample, 100), 8410)
})

test('Day 11 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 9_799_681)
  assert.strictEqual(run(input, 1_000_000), 513_171_773_355)
})
