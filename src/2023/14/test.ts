import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 14 — Sample', () => {
  const sample = $.sample(
    `
    O....#....
    O.OO#....#
    .....##...
    OO.#O....O
    .O.....O#.
    O.#..O.#.#
    ..O..#O..O
    .......O..
    #....###..
    #OO..#....
    `
  )

  assert.strictEqual(run(sample), 136)
  assert.strictEqual(run(sample, true), 64)
})

test('Day 14 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 103_333)
  assert.strictEqual(run(input, true), 97_241)
})
