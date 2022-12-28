const test = require('ava')
const $ = require('../../helpers')
const { sequential, parallel } = require('./')

test('Day 07 — Sample', t => {
  const sample = $.sample(`
  Step C must be finished before step A can begin.
  Step C must be finished before step F can begin.
  Step A must be finished before step B can begin.
  Step A must be finished before step D can begin.
  Step B must be finished before step E can begin.
  Step D must be finished before step E can begin.
  Step F must be finished before step E can begin.
  `)

  t.is(sequential(sample, 1, 0), 'CABDFE')
  t.deepEqual(parallel(sample, 2, 0), { duration: 15, order: 'CABFDE' })
})

test('Day 07 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(sequential(input), 'GKRVWBESYAMZDPTIUCFXQJLHNO')
  t.deepEqual(parallel(input, 5, 60), {
    duration: 903,
    order: 'GRWKBEVZDSYAPMTUCFIXQJLHNO',
  })
})
