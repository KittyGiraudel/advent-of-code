import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { paint } from './'

test('Day 11 — Solutions', () => {
  const [input] = $.readInput(import.meta)
  const startOnBlack = paint(input, 0)
  const startOnWhite = paint(input, 1)

  assert.strictEqual(Array.from(startOnBlack.keys()).length, 2160)
})
