const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`.split('\n')

test('Day 8.1', t => {
  t.is(run(sample).currentMax, 1)
})

test('Day 8.2', t => {
  t.is(run(sample).absoluteMax, 10)
})

test('Day 8 — Solutions', t => {
  t.is(run(input).currentMax, 6061)
  t.is(run(input).absoluteMax, 6696)
})
