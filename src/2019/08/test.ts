import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { recompose, validate } from './'

test('Day 08 — Sample', () => {
  const sample = '0222112222120000'

  assert.deepStrictEqual(recompose(sample, { width: 2, height: 2 }).rows, [
    [0, 1],
    [1, 0],
  ])
})

test('Day 08 — Solutions', () => {
  const [input] = $.readInput(import.meta)
  const dimensions = { width: 25, height: 6 }

  assert.strictEqual(validate(input, dimensions), 2440)
})
