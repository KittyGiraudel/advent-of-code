const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname).map(Number)

const sample = `0
2
7
0`
  .split('\n')
  .map(Number)

test('Day 6.1', t => {
  t.is(run(sample)[0], 5)
})

test('Day 6.2', t => {
  t.is(run(sample)[1], 4)
})

test('Day 6 — Solutions', t => {
  t.deepEqual(run(input), [14029, 2765])
})
