import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 11 — Sample', () => {
  const [sample] = $.sample('125 17')

  assert.strictEqual(run(sample, 25), 55312)
  assert.strictEqual(run(sample, 75), 65601038650482)
})

test('Day 11 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(run(input, 25), 194782)
  assert.strictEqual(run(input, 75), 233007586663131)
})
