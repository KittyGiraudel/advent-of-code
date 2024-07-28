import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 04 — Sample', () => {
  const sample = $.sample(`
  aaaaa-bbb-z-y-x-123[abxyz]
  a-b-c-d-e-f-g-h-987[abcde]
  not-a-real-room-404[oarel]
  totally-real-room-200[decoy]
  `)

  assert.strictEqual(run(sample), 1514)
})

test('Day 04 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 409_147)
  assert.strictEqual(run(input, true), 991)
})
