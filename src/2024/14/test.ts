import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 14 — Sample', () => {
  const sample = $.sample(
    `
    p=0,4 v=3,-3
    p=6,3 v=-1,-3
    p=10,3 v=-1,2
    p=2,0 v=2,-1
    p=0,0 v=1,3
    p=3,0 v=-2,-2
    p=7,6 v=-1,-3
    p=3,0 v=-1,-2
    p=9,3 v=2,3
    p=7,3 v=-1,2
    p=2,4 v=2,-3
    p=9,5 v=-3,-3
    `
  )

  assert.strictEqual(run(sample), 12)
})

test('Day 14 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 230172768)
  assert.strictEqual(run(input, true), 8087)
})
