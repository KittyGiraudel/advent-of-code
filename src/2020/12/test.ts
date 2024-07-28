import assert from 'node:assert'
import test from 'node:test'
import { navigateLoose, navigateStrict } from '.'
import $ from '../../helpers'

test('Day 12 — Sample', () => {
  assert.strictEqual(navigateLoose('F10,N3,F7,R90,F11'.split(',')), 25)
  assert.strictEqual(navigateStrict('F10,N3,F7,R90,F11'.split(',')), 286)
})

test('Day 12 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(navigateLoose(input), 1631)
  assert.strictEqual(navigateStrict(input), 58_606)
})
