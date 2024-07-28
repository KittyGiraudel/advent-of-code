import assert from 'node:assert'
import test from 'node:test'
import { fightRecursive, getGameScore } from '.'
import $ from '../../helpers'

test('Day 22 — Sample', () => {
  const example = $.sample(
    `
  Player 1:
  9
  2
  6
  3
  1

  Player 2:
  5
  8
  4
  7
  10
  `,
    { delimiter: '\n\n' }
  )

  assert.strictEqual(getGameScore(example), 306)
  assert.strictEqual(getGameScore(example, fightRecursive), 291)
})

test('Day 22 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  assert.strictEqual(getGameScore(input), 34_664)
  assert.strictEqual(getGameScore(input, fightRecursive), 32_018)
})
