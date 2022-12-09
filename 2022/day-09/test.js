const test = require('ava')
const { countTailPositions } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`.split('\n')

test('Day 9.1', t => {
  t.is(countTailPositions(sample), 13)
})

test('Day 9.2', t => {
  t.is(countTailPositions(sample, 10), 1)
})

test('Day 9 — Solutions', t => {
  t.is(countTailPositions(input), 6087)
  t.is(countTailPositions(input, 10), 2493)
})
