const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test.skip('Day 16.1', t => {})

test.skip('Day 16.2', t => {})

test('Day 16 — Solutions', t => {
  t.is(run(input), 373)
  t.is(run(input, true), 260)
})
