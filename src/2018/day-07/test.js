const test = require('ava')
const { sequential, parallel } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`.split('\n')

test('Day 7.1', t => {
  t.is(sequential(sample, 1, 0), 'CABDFE')
})

test('Day 7.2', t => {
  t.deepEqual(parallel(sample, 2, 0), { duration: 15, order: 'CABFDE' })
})

test('Day 7 — Solutions', t => {
  t.is(sequential(input), 'GKRVWBESYAMZDPTIUCFXQJLHNO')
  t.deepEqual(parallel(input, 5, 60), {
    duration: 903,
    order: 'GRWKBEVZDSYAPMTUCFIXQJLHNO',
  })
})
