import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 24 — Sample', { skip: true }, async () => {
  const sample = $.sample(
    `
    19, 13, 30 @ -2,  1, -2
    18, 19, 22 @ -1, -1, -2
    20, 25, 34 @ -2, -2, -4
    12, 31, 28 @ -1, -2, -1
    20, 19, 15 @  1, -5, -3
    `
  )
  assert.strictEqual(await run(sample), 15107)
})

test('Day 24 — Solutions', async () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(await run(input), 15107)
  // assert.strictEqual(await run(input, true), 856642398547748)
})
