const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname).map(Number)

const sample = `0
3
0
1
-3`
  .split('\n')
  .map(Number)

test('Day 05 — Sample', t => {
  t.is(run(sample), 5)
  t.is(run(sample, 3), 10)
})

test('Day 05 — Solutions', t => {
  t.is(run(input), 372671)
  t.is(run(input, 3), 25608480)
})
