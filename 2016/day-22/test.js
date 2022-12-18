const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test.skip('Day 22 — Sample', t => {})

test('Day 22 — Solutions', t => {
  t.is(run(input), 960)
})
