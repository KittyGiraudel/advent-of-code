import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 19 — Sample', () => {
  const sample = $.sample(
    `
    r, wr, b, g, bwu, rb, gb, br

    brwrr
    bggr
    gbbr
    rrbgbr
    ubwu
    bwurrg
    brgr
    bbrgwb
    `
  )

  assert.strictEqual(run(sample), 6)
  assert.strictEqual(run(sample, true), 16)
})

test('Day 19 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 233)
  assert.strictEqual(run(input, true), 691316989225259)
})
