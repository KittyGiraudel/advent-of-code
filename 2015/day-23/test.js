const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `inc a
jio a, +2
tpl a
inc a`.split('\n')

test('Day 23 — Sample', t => {
  t.is(run(sample).a, 2)
})

test('Day 23 — Solutions', t => {
  t.is(run(input).b, 307)
  t.is(run(input, 1).b, 160)
})
