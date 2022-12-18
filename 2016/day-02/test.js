const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `ULL
RRDDD
LURDL
UUUUD`.split('\n')

test('Day 02 — Sample', t => {
  t.is(run(sample), '1985')
  t.is(run(sample, true), '5DB3')
})

test('Day 02 — Solutions', t => {
  t.is(run(input), '78985')
  t.is(run(input, true), '57DD8')
})
