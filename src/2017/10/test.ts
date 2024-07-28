import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { getHash, run } from './'

test('Day 10 — Sample', () => {
  assert.strictEqual(run([3, 4, 1, 5], [0, 1, 2, 3, 4]), 12)
  assert.strictEqual(getHash(''), 'a2582a3a0e66e6e86e3812dcb672a272')
  assert.strictEqual(getHash('AoC 2017'), '33efeb34ea91902bb2f59c9920caa6cd')
  assert.strictEqual(getHash('1,2,3'), '3efbe78a8d82f29979031a4aa0b16a9d')
  assert.strictEqual(getHash('1,2,4'), '63960835bcdc130f0b66d7ff4f6a5a8e')
})

test('Day 10 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: ',' }).map(Number)

  assert.strictEqual(run(input), 11_375)
  assert.strictEqual(
    getHash(input.join(',')),
    'e0387e2ad112b7c2ef344e44885fe4d8'
  )
})
