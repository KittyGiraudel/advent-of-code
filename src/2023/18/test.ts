import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 18 — Sample', () => {
  const sample = $.sample(
    `
    R 6 (#70c710)
    D 5 (#0dc571)
    L 2 (#5713f0)
    D 2 (#d2c081)
    R 2 (#59c680)
    D 2 (#411b91)
    L 5 (#8ceee2)
    U 2 (#caa173)
    L 1 (#1b58a2)
    U 2 (#caa171)
    R 2 (#7807d2)
    U 3 (#a77fa3)
    L 2 (#015232)
    U 2 (#7a21e3)
    `
  )

  assert.strictEqual(run(sample), 62)
  assert.strictEqual(run(sample, true), 952408144115)
})

test('Day 18 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 92758)
  assert.strictEqual(run(input, true), 62762509300678)
})
