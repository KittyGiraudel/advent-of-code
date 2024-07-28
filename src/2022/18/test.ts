import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import type { TriPoint } from '../../types'
import { getSurfaceArea } from './'

test('Day 18 — Sample', () => {
  const sample = $.sample(`
  2,2,2
  1,2,2
  3,2,2
  2,1,2
  2,3,2
  2,2,1
  2,2,3
  2,2,4
  2,2,6
  1,2,5
  3,2,5
  2,1,5
  2,3,5
  `) as TriPoint[]

  assert.strictEqual(getSurfaceArea(sample), 64)
  assert.strictEqual(getSurfaceArea(sample, true), 58)
})

test('Day 18 — Solutions', () => {
  const input = $.readInput(import.meta) as TriPoint[]

  assert.strictEqual(getSurfaceArea(input), 3412)
  assert.strictEqual(getSurfaceArea(input, true), 2018)
})
