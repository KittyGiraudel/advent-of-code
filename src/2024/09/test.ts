import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 09 — Sample', () => {
  const [sample] = $.sample('2333133121414131402')

  assert.strictEqual(run(sample), 1928)
  assert.strictEqual(run(sample, true), 2858)
})

test('Day 09 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(run(input), 6384282079460)
  assert.strictEqual(run(input, true), 6408966547049)
})
