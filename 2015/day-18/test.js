const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `.#.#.#
...##.
#....#
..#...
#.#..#
####..`.split('\n')

test('Day 18.1', t => {
  t.is(run(sample, 4), 4)
})

test('Day 18.2', t => {
  t.is(run(sample, 5, true), 17)
})

test('Day 18 — Solutions', t => {
  t.is(run(input, 100), 1061)
  t.is(run(input, 100, true), 1006)
})
