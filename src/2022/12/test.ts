import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { findPath, findShortestPath } from './'

test('Day 12 — Sample', () => {
  const sample = $.sample(`
  Sabqponm
  abcryxxl
  accszExk
  acctuvwj
  abdefghi
  `)

  assert.strictEqual(findPath(sample), 31)
  assert.strictEqual(findShortestPath(sample), 29)
})

test('Day 12 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(findPath(input), 484)
  assert.strictEqual(findShortestPath(input), 478)
})
