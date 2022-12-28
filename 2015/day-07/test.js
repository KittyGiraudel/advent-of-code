const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 07 — Sample', t => {
  const sample = $.sample(`
  123 -> x
  456 -> y
  x AND y -> d
  x OR y -> e
  x LSHIFT 2 -> f
  y RSHIFT 2 -> g
  NOT x -> h
  NOT y -> i
  `)

  t.is(run(sample).d, 72)
  t.is(run(sample).e, 507)
  t.is(run(sample).f, 492)
  t.is(run(sample).g, 114)
  t.is(run(sample).x, 123)
  t.is(run(sample).y, 456)
  t.is(run(sample).h, 65412)
  t.is(run(sample).i, 65079)
})

test('Day 07 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input).a, 16076)
  t.is(run(input, { b: 16076 }).a, 2797)
})
