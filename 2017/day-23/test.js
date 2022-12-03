const test = require('ava')
const { run, skip } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test.skip('Day 23.1', t => {})

test.skip('Day 23.2', t => {})

test('Day 23 — Solutions', t => {
  t.is(run(input), 3025)
  t.is(skip(input), 915)
})
