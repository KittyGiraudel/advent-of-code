import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 23 — Sample', () => {
  const sample = $.sample(`
  ....#..
  ..###.#
  #...#.#
  .#...##
  #.###..
  ##.#.##
  .#..#..
  `)

  assert.strictEqual(run(sample), 110)
  assert.strictEqual(run(sample, Number.POSITIVE_INFINITY), 20)
})

test('Day 23 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 4249)
  assert.strictEqual(run(input, Number.POSITIVE_INFINITY), 980)
})
