import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 06 — Sample', () => {
  const sample = [0, 2, 7, 0]

  assert.strictEqual(run(sample)[0], 5)
  assert.strictEqual(run(sample)[1], 4)
})

test('Day 06 — Solutions', () => {
  const input = $.readInput(import.meta).map(Number)

  assert.deepStrictEqual(run(input), [14_029, 2765])
})
