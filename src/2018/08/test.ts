import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { parse, score } from './'

test('Day 08 — Sample', () => {
  const sample = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]

  assert.strictEqual(score(parse(sample.slice(0))), 138)
  assert.strictEqual(parse(sample.slice(0), true).value, 66)
})

test('Day 08 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: ' ' }).map(Number)

  assert.strictEqual(score(parse(input.slice(0))), 38_780)
  assert.strictEqual(parse(input.slice(0), true).value, 18_232)
})
