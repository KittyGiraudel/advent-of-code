import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { checksum, findId } from './'

test('Day 02 — Sample', () => {
  assert.strictEqual(
    checksum([
      'abcdef',
      'bababc',
      'abbcde',
      'abcccd',
      'aabcdd',
      'abcdee',
      'ababab',
    ]),
    12
  )
})

test('Day 02 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(checksum(input), 6916)
  assert.strictEqual(findId(input), 'oeylbtcxjqnzhgyylfapviusr')
})
