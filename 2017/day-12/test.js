const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`.split('\n')

test('Day 12 — Sample', t => {
  t.is(run(sample)[0], 6)
  t.is(run(sample)[1], 2)
})

test('Day 12 — Solutions', t => {
  t.deepEqual(run(input), [141, 171])
})
