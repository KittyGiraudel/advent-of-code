import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 18 — Sample', () => {
  const sample = $.sample(
    `
    5,4
    4,2
    4,5
    3,0
    2,1
    6,3
    2,4
    1,5
    0,6
    3,3
    2,6
    5,1
    1,2
    5,5
    2,5
    6,5
    1,4
    0,4
    6,4
    1,1
    6,1
    1,0
    0,5
    1,6
    2,0
    `
  )

  assert.strictEqual(run(sample, 12), 22)
  assert.strictEqual(run(sample, 12, true), '6,1')
})

test('Day 18 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input, 1024), 250)
  assert.strictEqual(run(input, 1024, true), '56,8')
})
