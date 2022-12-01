const test = require('ava')
const { findHighestGroup, findHighestGroups } = require('./')
const input = require('../../helpers/readInput')(__dirname, '\n\n')

const sample = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`.split('\n\n')

test('Day 1.1', t => {
  t.is(findHighestGroup(sample), 24000)
})

test('Day 1.2', t => {
  t.is(findHighestGroups(sample, 3), 45000)
})

test('Day 1 — Solutions', t => {
  t.is(findHighestGroup(input), 70369)
  t.is(findHighestGroups(input, 3), 203002)
})
