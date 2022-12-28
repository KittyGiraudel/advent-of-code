const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 21 — Sample', t => {
  const sample = $.sample(`
  ../.# => ##./#../...
  .#./..#/### => #..#/..../..../#..#
  `)

  t.is(run(sample, 2), 12)
})

test('Day 21 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input, 5), 197)
  t.is(run(input, 18), 3081737)
})
