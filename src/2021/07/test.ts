import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 07 — Sample', () => {
  const sample = '16,1,2,0,4,2,7,1,2,14'.split(',').map(Number)

  assert.strictEqual(run(sample), 37)
  assert.strictEqual(run(sample, true), 168)
})

test('Day 07 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: ',' }).map(Number)

  assert.strictEqual(run(input), 344_138)
  assert.strictEqual(run(input, true), 94_862_124)
})
