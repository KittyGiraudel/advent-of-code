import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 16 — Sample', () => {
  const sample1 = $.sample(
    `
    ###############
    #.......#....E#
    #.#.###.#.###.#
    #.....#.#...#.#
    #.###.#####.#.#
    #.#.#.......#.#
    #.#.#####.###.#
    #...........#.#
    ###.#.#####.#.#
    #...#.....#.#.#
    #.#.#.###.#.#.#
    #.....#...#.#.#
    #.###.#.#.#.#.#
    #S..#.....#...#
    ###############
    `
  )
  const sample2 = $.sample(
    `
    #################
    #...#...#...#..E#
    #.#.#.#.#.#.#.#.#
    #.#.#.#...#...#.#
    #.#.#.#.###.#.#.#
    #...#.#.#.....#.#
    #.#.#.#.#.#####.#
    #.#...#.#.#.....#
    #.#.#####.#.###.#
    #.#.#.......#...#
    #.#.###.#####.###
    #.#.#...#.....#.#
    #.#.#.#####.###.#
    #.#.#.........#.#
    #.#.#.#########.#
    #S#.............#
    #################
    `
  )

  assert.strictEqual(run(sample1), 7036)
  assert.strictEqual(run(sample1, true), 45)
  assert.strictEqual(run(sample2), 11048)
  assert.strictEqual(run(sample2, true), 64)
})

test('Day 16 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 99460)
  assert.strictEqual(run(input, true), 500)
})
