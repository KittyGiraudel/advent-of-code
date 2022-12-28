const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 08 — Sample', t => {
  const sample = $.sample(`
  rect 3x2
  rotate column x=1 by 1
  rotate row y=0 by 4
  rotate column x=1 by 1
  `)

  t.is(run(sample, [7, 3]), 6)
})

test('Day 08 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input), 121)
})
