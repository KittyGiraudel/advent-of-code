import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { debug } from './'

test('Day 16 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  assert.strictEqual(debug(input)[0], 627)
})
