import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { battle, cheat } from './'

test('Day 15 — Sample', () => {
  const sampleA = $.sample(`
  #######
  #.G...#
  #...EG#
  #.#.#G#
  #..G#E#
  #.....#
  #######
  `)

  const sampleB = $.sample(`
  #######
  #G..#E#
  #E#E.E#
  #G.##.#
  #...#E#
  #...E.#
  #######
  `)

  const sampleC = $.sample(`
  #######
  #E..EG#
  #.#G.E#
  #E.##E#
  #G..#.#
  #..E#.#
  #######
  `)

  const sampleD = $.sample(`
  #######
  #.E...#
  #.#..G#
  #.###.#
  #E#G#G#
  #...#G#
  #######
  `)

  const sampleE = $.sample(`
  #########
  #G......#
  #.E.#...#
  #..##..G#
  #...##..#
  #...#...#
  #.G...G.#
  #.....G.#
  #########
  `)

  const sampleF = $.sample(`
  #######
  #E.G#.#
  #.#G..#
  #G.#.G#
  #G..#.#
  #...E.#
  #######
  `)

  assert.strictEqual(battle(sampleA), 27_730)
  assert.strictEqual(battle(sampleD), 28_944)
  assert.strictEqual(battle(sampleE), 18_740)
  assert.strictEqual(battle(sampleB), 36_334)
  assert.strictEqual(battle(sampleC), 39_514)
  assert.strictEqual(cheat(sampleA), 4988)
  assert.strictEqual(cheat(sampleC), 31_284)
  assert.strictEqual(cheat(sampleF), 3478)
  assert.strictEqual(cheat(sampleD), 6474)
  assert.strictEqual(cheat(sampleE), 1140)
})

test('Day 15 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(battle(input), 181_522)
  assert.strictEqual(cheat(input), 68_324)
})
