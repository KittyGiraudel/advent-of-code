import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 25 — Sample', () => {
  const sample = $.sample(
    `
  Begin in state A.
  Perform a diagnostic checksum after 6 steps.

  In state A:
    If the current value is 0:
      - Write the value 1.
      - Move one slot to the right.
      - Continue with state B.
    If the current value is 1:
      - Write the value 0.
      - Move one slot to the left.
      - Continue with state B.

  In state B:
    If the current value is 0:
      - Write the value 1.
      - Move one slot to the left.
      - Continue with state A.
    If the current value is 1:
      - Write the value 1.
      - Move one slot to the right.
      - Continue with state A.
  `,
    { delimiter: '\n\n' }
  )

  assert.strictEqual(run(sample), 3)
})

test('Day 25 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  assert.strictEqual(run(input), 2526)
})
