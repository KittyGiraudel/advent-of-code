import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { countOverlappingInches, detect } from './'

test('Day 03 — Sample', () => {
  const sampleA = $.sample(`
  #1 @ 1,3: 4x4
  #2 @ 3,1: 4x4
  #3 @ 5,5: 2x2
  `)

  assert.strictEqual(countOverlappingInches(sampleA), 4)
})

test('Day 03 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(countOverlappingInches(input), 114_946)
  assert.strictEqual(detect(input), 877)
})
