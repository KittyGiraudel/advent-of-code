import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 14 — Sample', () => {
  const sample = $.sample(`
  Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
  Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
  `)

  assert.strictEqual(run(sample, 1000)[0], 1120)
  assert.strictEqual(run(sample, 1000)[1], 689)
})

test('Day 14 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.deepStrictEqual(run(input, 2503), [2655, 1059])
})
