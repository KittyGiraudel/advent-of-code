import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 01 — Sample', () => {
  const sample = $.sample(`
  1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet
  `)

  const sample2 = $.sample(`
  two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen
  `)

  assert.strictEqual(run(sample), 142)
  assert.strictEqual(run(sample2, true), 281)
})

test('Day 01 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 54_644)
  assert.strictEqual(run(input, true), 53_348)
})
