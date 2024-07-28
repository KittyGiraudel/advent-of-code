import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 02 — Sample', () => {
  const sample = $.sample(`
  ULL
  RRDDD
  LURDL
  UUUUD
  `)

  assert.strictEqual(run(sample), '1985')
  assert.strictEqual(run(sample, true), '5DB3')
})

test('Day 02 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), '78985')
  assert.strictEqual(run(input, true), '57DD8')
})
