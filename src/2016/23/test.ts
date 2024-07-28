import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 23 — Sample', () => {
  const sample = $.sample(`
  cpy 2 a
  tgl a
  tgl a
  tgl a
  cpy 1 a
  dec a
  dec a
  `)

  assert.strictEqual(run(sample), 3)
})

test('Day 23 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input, 7), 11_739)
  // assert.strictEqual(run(input, 12), 479_008_299) // Takes several minutes…
})
