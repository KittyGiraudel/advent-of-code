import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { resolve, run } from './'

test('Day 24 — Sample', () => {
  const sampleA = $.sample(`
  inp x
  mul x -1
  `)

  const sampleB = $.sample(`
  inp z
  inp x
  mul z 3
  eql z x
  `)

  assert.strictEqual(run(sampleA, [7]).x, -7)
  assert.strictEqual(run(sampleB, [3, 8]).z, 0)
  assert.strictEqual(run(sampleB, [3, 9]).z, 1)
})

test('Day 24 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(resolve(input, true), 53_999_995_829_399)
  assert.strictEqual(resolve(input, false), 11_721_151_118_175)
})
