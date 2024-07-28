import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { parallel, sequential } from './'

test('Day 07 — Sample', () => {
  const sample = $.sample(`
  Step C must be finished before step A can begin.
  Step C must be finished before step F can begin.
  Step A must be finished before step B can begin.
  Step A must be finished before step D can begin.
  Step B must be finished before step E can begin.
  Step D must be finished before step E can begin.
  Step F must be finished before step E can begin.
  `)

  assert.strictEqual(sequential(sample), 'CABDFE')
  assert.deepStrictEqual(parallel(sample, 2, 0), {
    duration: 15,
    order: 'CABFDE',
  })
})

test('Day 07 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(sequential(input), 'GKRVWBESYAMZDPTIUCFXQJLHNO')
  assert.deepStrictEqual(parallel(input, 5, 60), {
    duration: 903,
    order: 'GRWKBEVZDSYAPMTUCFIXQJLHNO',
  })
})
