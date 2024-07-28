import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 15 — Sample', () => {
  const sample = $.sample(`
  1163751742
  1381373672
  2136511328
  3694931569
  7463417111
  1319128137
  1359912421
  3125421639
  1293138521
  2311944581
  `)

  assert.strictEqual(run(sample), 40)
  assert.strictEqual(run(sample, 5), 315)
})

test('Day 15 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 361)
  assert.strictEqual(run(input, 5), 2838)
})
