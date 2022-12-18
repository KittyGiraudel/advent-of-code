const test = require('ava')
const { plot } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test.skip('Day 10 — Sample', t => {})

test('Day 10 — Solutions', t => {
  t.is(plot(input), 10312)
})
