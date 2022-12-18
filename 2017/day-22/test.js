const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `..#
#..
...`.split('\n')

test('Day 22 — Sample', t => {
  t.is(run(sampleA, 7), 5)
  t.is(run(sampleA, 70), 41)
  t.is(run(sampleA, 10_000), 5587)
  t.is(run(sampleA, 100, true), 26)
  t.is(run(sampleA, 10_000_000, true), 2511944)
})

test('Day 22 — Solutions', t => {
  t.is(run(input, 10000), 5280)
  t.is(run(input, 10_000_000, true), 2512261)
})
