const test = require('ava')
const { run, cross } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `0: 3
1: 2
4: 4
6: 4`.split('\n')

test('Day 13.1', t => {
  t.is(run(sample), 24)
})

test('Day 13.2', t => {
  t.is(cross(sample), 10)
})

test('Day 13 — Solutions', t => {
  t.is(run(input), 1900)
  t.is(cross(input), 3966414)
})
