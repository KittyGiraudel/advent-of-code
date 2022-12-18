const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`.split('\n')

test('Day 08 — Sample', t => {
  t.is(run(sample, [7, 3]), 6)
})

test('Day 08 — Solutions', t => {
  t.is(run(input), 121)
})
