import test from 'ava'
import { run } from './'
import $ from '../../helpers'

test('Day 25 — Sample', t => {
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
    '\n\n'
  )

  t.is(run(sample), 3)
})

test('Day 25 — Solutions', t => {
  const input = $.readInput(import.meta, '\n\n')

  t.is(run(input), 2526)
})
