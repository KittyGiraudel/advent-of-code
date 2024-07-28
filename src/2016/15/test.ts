import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 15 — Sample', () => {
  const sample = $.sample(`
  Disc #1 has 5 positions; at time=0, it is at position 4.
  Disc #2 has 2 positions; at time=0, it is at position 1.
  `)

  assert.strictEqual(run(sample), 5)
})

test('Day 15 — Solutions', () => {
  const input = $.readInput(import.meta)
  const extraDisk = 'Disc #7 has 11 positions; at time=0, it is at position 0.'

  assert.strictEqual(run(input), 121_834)
  assert.strictEqual(run(input.concat(extraDisk)), 3_208_099)
})
