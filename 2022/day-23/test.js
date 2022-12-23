const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`.split('\n')

test('Day 23 — Sample', t => {
  t.is(run(sample), 110)
  t.is(run(sample, Infinity), 20)
})

test('Day 23 — Solutions', t => {
  t.is(run(input), 4249)
  t.is(run(input, Infinity), 980)
})
