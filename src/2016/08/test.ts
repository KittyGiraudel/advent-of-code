import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 08 — Sample', () => {
  const sample = $.sample(`
  rect 3x2
  rotate column x=1 by 1
  rotate row y=0 by 4
  rotate column x=1 by 1
  `)

  assert.strictEqual(run(sample, [7, 3]), 6)
})

test('Day 08 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 121)
})
