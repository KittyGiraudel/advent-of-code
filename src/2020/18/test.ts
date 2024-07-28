import assert from 'node:assert'
import test from 'node:test'
import { computeLoose, computeStrict } from '.'
import $ from '../../helpers'

test('Day 18 — Sample', () => {
  assert.strictEqual(computeLoose('1 + (2 * 3) + (4 * (5 + 6))'), 51)
  assert.strictEqual(computeLoose('2 * 3 + (4 * 5)'), 26)
  assert.strictEqual(computeLoose('5 + (8 * 3 + 9 + 3 * 4 * 3)'), 437)
  assert.strictEqual(
    computeLoose('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'),
    12_240
  )
  assert.strictEqual(
    computeLoose('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'),
    13_632
  )
  assert.strictEqual(computeStrict('1 + (2 * 3) + (4 * (5 + 6))'), 51)
  assert.strictEqual(computeStrict('2 * 3 + (4 * 5)'), 46)
  assert.strictEqual(computeStrict('5 + (8 * 3 + 9 + 3 * 4 * 3)'), 1445)
  assert.strictEqual(
    computeStrict('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'),
    669_060
  )
  assert.strictEqual(
    computeStrict('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'),
    23_340
  )
})

test('Day 18 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual($.sum(input.map(computeLoose)), 280_014_646_144)
  assert.strictEqual($.sum(input.map(computeStrict)), 9_966_990_988_262)
})
