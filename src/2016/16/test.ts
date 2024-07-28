import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 16 — Sample', () => {
  assert.strictEqual(run('10000', 20), '01100')
})

test('Day 16 — Solutions', () => {
  assert.strictEqual(run('01111010110010011', 272), '00100111000101111')
  assert.strictEqual(run('01111010110010011', 35_651_584), '11101110011100110')
})
