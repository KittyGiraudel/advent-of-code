import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 06 — Sample', () => {
  const sample = '3,4,3,1,2'

  assert.strictEqual(run(sample, 18), 26)
  assert.strictEqual(run(sample, 80), 5934)
  assert.strictEqual(run(sample, 256), 26_984_457_539)
})

test('Day 06 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(run(input, 80), 363_101)
  assert.strictEqual(run(input, 256), 1_644_286_074_024)
})
