const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`.split('\n')

test('Day 7.1', t => {
  t.is(run(sample).d, 72)
  t.is(run(sample).e, 507)
  t.is(run(sample).f, 492)
  t.is(run(sample).g, 114)
  t.is(run(sample).x, 123)
  t.is(run(sample).y, 456)
  t.is(run(sample).h, 65412)
  t.is(run(sample).i, 65079)
})

test.skip('Day 7.2', t => {})

test('Day 7 — Solutions', t => {
  t.is(run(input).a, 16076)
  t.is(run(input, { b: 16076 }).a, 2797)
})
