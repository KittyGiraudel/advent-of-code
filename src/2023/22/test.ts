import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 22 — Sample', () => {
  const sample = $.sample(
    `
    1,0,1~1,2,1
    0,0,2~2,0,2
    0,2,3~2,2,3
    0,0,4~0,2,4
    2,0,5~2,2,5
    0,1,6~2,1,6
    1,1,8~1,1,9
    `
  )
  assert.strictEqual(run(sample), 5)
  assert.strictEqual(run(sample, true), 7)
})

test('Day 22 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 503)
  assert.strictEqual(run(input, true), 98431)
})
