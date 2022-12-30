import test from 'ava'
import $ from '../../helpers'
import { getGameScore, fightRecursive } from '.'

test('Day 22 — Sample', t => {
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

  t.is(getGameScore(example), 306)
  t.is(getGameScore(example, fightRecursive), 291)
})

test('Day 22 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  t.is(getGameScore(input), 34664)
  t.is(getGameScore(input, fightRecursive), 32018)
})
