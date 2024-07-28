import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 11 — Sample', () => {
  const sample = $.sample(`
  5483143223
  2745854711
  5264556173
  6141336146
  6357385478
  4167524645
  2176841721
  6882881134
  4846848554
  5283751526
  `)

  assert.strictEqual(run(sample), 1656)
  assert.strictEqual(run(sample, true), 195)
})

test('Day 11 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 1661)
  assert.strictEqual(run(input, true), 334)
})
