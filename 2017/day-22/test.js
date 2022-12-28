const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 22 — Sample', t => {
  const sample = $.sample(`
  ..#
  #..
  ...
  `)

  t.is(run(sample, 7), 5)
  t.is(run(sample, 70), 41)
  t.is(run(sample, 10_000), 5587)
  t.is(run(sample, 100, true), 26)
  t.is(run(sample, 10_000_000, true), 2511944)
})

test('Day 22 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input, 10000), 5280)
  t.is(run(input, 10_000_000, true), 2512261)
})
