const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`.split('\n')

test('Day 12.1', t => {
  t.is(run(sample), 42)
})

test.skip('Day 12.2', t => {})

test('Day 12 — Solutions', t => {
  t.is(run(input, 0), 317993)
  t.is(run(input, 1), 9227647)
})
