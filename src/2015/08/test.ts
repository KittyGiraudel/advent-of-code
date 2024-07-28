import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { decode, encode } from './'

test('Day 08 — Sample', () => {
  const sample = $.readInput(import.meta, { name: 'sample.txt' })

  assert.strictEqual(decode(sample), 12)
  assert.strictEqual(encode(sample), 19)
})

test('Day 08 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(decode(input), 1350)
  assert.strictEqual(encode(input), 2085)
})
