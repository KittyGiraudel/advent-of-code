import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 15 — Sample', () => {
  const sample = $.sample(`
  Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
  Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
  `)

  assert.strictEqual(run(sample), 62_842_880)
  assert.strictEqual(run(sample, 500), 57_600_000)
})

test('Day 15 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 21_367_368)
  assert.strictEqual(run(input, 500), 1_766_400)
})
