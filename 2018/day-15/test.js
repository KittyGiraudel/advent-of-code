const test = require('ava')
const { battle, cheat } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample0 = `
#########
#G..G..G#
#.......#
#.......#
#G..E..G#
#.......#
#.......#
#G..G..G#
#########`
  .trim()
  .split('\n')

const sampleA = `
#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`
  .trim()
  .split('\n')

const sampleB = `
#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`
  .trim()
  .split('\n')

const sampleC = `
#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`
  .trim()
  .split('\n')

const sampleD = `
#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`
  .trim()
  .split('\n')

const sampleE = `
#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`
  .trim()
  .split('\n')

const sampleF = `
#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######
`
  .trim()
  .split('\n')

test('Day 15.1', t => {
  // Works correctly: t.is(battle(sample0), 0)
  // Passing:
  t.is(battle(sampleA), 27730)
  t.is(battle(sampleD), 28944)
  t.is(battle(sampleE), 18740)
  t.is(battle(sampleB), 36334)
  t.is(battle(sampleC), 39514)
})

test('Day 15.2', t => {
  t.is(cheat(sampleA), 4988)
  t.is(cheat(sampleC), 31284)
  t.is(cheat(sampleF), 3478)
  t.is(cheat(sampleD), 6474)
  t.is(cheat(sampleE), 1140)
})

test('Day 15 — Solutions', t => {
  t.is(battle(input), 181522)
  // Skipping this one because it takes about 7 seconds.
  // t.is(cheat(input), 68324)
})
