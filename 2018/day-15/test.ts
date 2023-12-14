import test from 'ava'
import $ from '../../helpers'
import { battle, cheat } from './'

test('Day 15 — Sample', t => {
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

  t.is(battle(sampleA), 27_730)
  t.is(battle(sampleD), 28_944)
  t.is(battle(sampleE), 18_740)
  t.is(battle(sampleB), 36_334)
  t.is(battle(sampleC), 39_514)
  t.is(cheat(sampleA), 4988)
  t.is(cheat(sampleC), 31_284)
  t.is(cheat(sampleF), 3478)
  t.is(cheat(sampleD), 6474)
  t.is(cheat(sampleE), 1140)
})

test('Day 15 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(battle(input), 181_522)
  t.is(cheat(input), 68_324)
})
