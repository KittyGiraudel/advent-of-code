const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`.split('\n')

test('Day 23.1', t => {
  t.is(run(sample), 3)
})

test.skip('Day 23.2', t => {})

test('Day 23 — Solutions', t => {
  // t.is(run(input, 7), 11739)
  t.is(run(input, 12), 11739)
})
