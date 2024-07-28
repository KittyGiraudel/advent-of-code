import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { battleA, battleB } from './'

test('Day 02 — Sample', () => {
  const sample = $.sample(`
  A Y
  B X
  C Z
  `)

  assert.strictEqual(battleA(sample), 15)
  assert.strictEqual(battleB(sample), 12)
})

test('Day 02 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(battleA(input), 13_682)
  assert.strictEqual(battleB(input), 12_881)
})
