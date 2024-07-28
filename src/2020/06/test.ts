import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { getLooseCountForGroup, getStrictCountForGroup } from './'

test('Day 06 — Sample', () => {
  assert.strictEqual(getLooseCountForGroup('abc'), 3)
  assert.strictEqual(getLooseCountForGroup('a\nb\nc'), 3)
  assert.strictEqual(getLooseCountForGroup('ab\nac'), 3)
  assert.strictEqual(getLooseCountForGroup('a\na\na\na'), 1)
  assert.strictEqual(getLooseCountForGroup('b'), 1)
  assert.strictEqual(getStrictCountForGroup('abc'), 3)
  assert.strictEqual(getStrictCountForGroup('a\nb\nc'), 0)
  assert.strictEqual(getStrictCountForGroup('ab\nac'), 1)
  assert.strictEqual(getStrictCountForGroup('a\na\na\na'), 1)
  assert.strictEqual(getStrictCountForGroup('b'), 1)
  assert.strictEqual(getStrictCountForGroup('w\ns\nq\ns'), 0)
})

test('Day 06 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  assert.strictEqual($.sum(input.map(getLooseCountForGroup)), 6703)
  assert.strictEqual($.sum(input.map(getStrictCountForGroup)), 3430)
})
