import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 16 — Sample', () => {
  const sample = $.sample(
    `
    .|...\\....
    |.-.\\.....
    .....|-...
    ........|.
    ..........
    .........\\
    ..../.\\\\..
    .-.-/..|..
    .|....-|.\\
    ..//.|....
    `
  )

  assert.strictEqual(run(sample), 46)
  assert.strictEqual(run(sample, true), 51)
})

test('Day 16 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 8112)
  assert.strictEqual(run(input, true), 8314)
})
