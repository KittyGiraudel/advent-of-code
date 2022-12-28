const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 08 — Sample', t => {
  const sample = $.sample(`
  b inc 5 if a > 1
  a inc 1 if b < 5
  c dec -10 if a >= 1
  c inc -20 if c == 10
  `)

  t.is(run(sample).currentMax, 1)
  t.is(run(sample).absoluteMax, 10)
})

test('Day 08 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input).currentMax, 6061)
  t.is(run(input).absoluteMax, 6696)
})
