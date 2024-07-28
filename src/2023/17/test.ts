import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 17 — Sample', () => {
  const sample = $.sample(
    `
    2413432311323
    3215453535623
    3255245654254
    3446585845452
    4546657867536
    1438598798454
    4457876987766
    3637877979653
    4654967986887
    4564679986453
    1224686865563
    2546548887735
    4322674655533
    `
  )
  const sampleB = $.sample(`
  111111111111
  999999999991
  999999999991
  999999999991
  999999999991
  `)

  assert.strictEqual(run(sample), 102)
  assert.strictEqual(run(sampleB, true), 71)
  assert.strictEqual(run(sample, true), 94)
})

test('Day 17 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 936)
  assert.strictEqual(run(input, true), 1157)
})
