import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 08 — Sample', () => {
  const sample = $.sample(
    `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)
    `
  )
  const sample2 = $.sample(
    `LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)
    `
  )

  assert.strictEqual(run(sample), 6)
  assert.strictEqual(run(sample2, true), 6)
})

test('Day 08 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 12_169)
  assert.strictEqual(run(input, true), 12_030_780_859_469)
})
