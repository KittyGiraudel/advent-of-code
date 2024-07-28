import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { countVisibleTrees, getHighestScenicScore } from './'

test('Day 08 — Sample', () => {
  const sample = $.sample(`
  30373
  25512
  65332
  33549
  35390
  `)

  assert.strictEqual(countVisibleTrees(sample), 21)
  assert.strictEqual(getHighestScenicScore(sample), 8)
})

test('Day 08 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(countVisibleTrees(input), 1827)
  assert.strictEqual(getHighestScenicScore(input), 335_580)
})
