import assert from 'node:assert'
import test from 'node:test'
import { getEncryptionKey } from '.'
import $ from '../../helpers'

test('Day 25 — Sample', () => {
  assert.strictEqual(getEncryptionKey(5_764_801, 17_807_724), 14_897_079)
})

test('Day 25 — Solutions', () => {
  const [door, card] = $.readInput(import.meta).map(Number)

  assert.strictEqual(getEncryptionKey(door, card), 17_980_581)
})
