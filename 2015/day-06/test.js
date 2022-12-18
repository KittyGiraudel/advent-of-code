const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `turn on 0,0 through 999,999
toggle 0,0 through 999,0
turn off 499,499 through 500,500`.split('\n')

test.skip('Day 06 — Sample', t => {})

test('Day 06 — Solutions', t => {
  t.is(run(input), 543903)
  t.is(run(input, true), 14687245)
})
