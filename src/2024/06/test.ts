import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 06 — Sample', () => {
  const sample = $.sample(
    `
    ....#.....
    .........#
    ..........
    ..#.......
    .......#..
    ..........
    .#..^.....
    ........#.
    #.........
    ......#...
    `
  )

  assert.strictEqual(run(sample), 41)
  assert.strictEqual(run(sample, true), 6)
})

test('Day 06 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 4752)
  assert.strictEqual(run(input, true), 1719) // Too slow to run
})
