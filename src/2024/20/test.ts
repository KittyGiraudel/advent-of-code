import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 20 — Sample', () => {
  const sample = $.sample(
    `
    ###############
    #...#...#.....#
    #.#.#.#.#.###.#
    #S#...#.#.#...#
    #######.#.#.###
    #######.#.#...#
    #######.#.###.#
    ###..E#...#...#
    ###.#######.###
    #...###...#...#
    #.#####.#.###.#
    #.#...#.#.#...#
    #.#.#.#.#.#.###
    #...#...#...###
    ###############
    `
  )

  // assert.strictEqual(run(sample), 22)
  // assert.strictEqual(run(sample, true), 285)
})

test('Day 20 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 1395)
  assert.strictEqual(run(input, true), 993178)
})
