import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { calibrate, recompose } from './'

test('Day 19 — Sample', () => {
  const sampleA = $.sample(`
  H => HO
  H => OH
  O => HH

  HOH
  `)

  const sampleB = $.sample(`
  H => HO
  H => OH
  O => HH

  HOHOHO
  `)

  assert.strictEqual(calibrate(sampleA), 4)
  assert.strictEqual(calibrate(sampleB), 7)
})

test('Day 19 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(calibrate(input), 509)
  assert.strictEqual(recompose(input), 195)
})
