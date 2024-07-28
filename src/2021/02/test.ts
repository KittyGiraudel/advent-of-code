import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 02 — Sample', () => {
  const sample = $.sample(`
  forward 5
  down 5
  forward 8
  up 3
  down 8
  forward 2
  `)

  assert.strictEqual(run(sample), 150)
  assert.strictEqual(run(sample, true), 900)
})

test('Day 02 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 1_488_669)
  assert.strictEqual(run(input, true), 1_176_514_794)
})
