import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 19 — Sample', () => {
  const sample = $.sample(
    `
      |         
      |  +--+   
      A  |  C   
  F---|----E|--+
      |  |  |  D
      +B-+  +--+`,
    { trim: false, deindent: false }
  ).slice(1)

  assert.strictEqual(run(sample)[0], 'ABCDEF')
  assert.strictEqual(run(sample)[1], 38)
})

test('Day 19 — Solutions', () => {
  const input = $.readInput(import.meta, { trim: false })

  assert.deepStrictEqual(run(input), ['VTWBPYAQFU', 17_358])
})
