const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 23 — Sample', t => {
  const sample = $.sample(`
  ....#..
  ..###.#
  #...#.#
  .#...##
  #.###..
  ##.#.##
  .#..#..
  `)

  t.is(run(sample), 110)
  t.is(run(sample, Infinity), 20)
})

test('Day 23 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input), 4249)
  t.is(run(input, Infinity), 980)
})
