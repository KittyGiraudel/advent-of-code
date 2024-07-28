import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 07 — Sample', () => {
  const sample = $.sample(`
  123 -> x
  456 -> y
  x AND y -> d
  x OR y -> e
  x LSHIFT 2 -> f
  y RSHIFT 2 -> g
  NOT x -> h
  NOT y -> i
  `)

  assert.strictEqual(run(sample).d, 72)
  assert.strictEqual(run(sample).e, 507)
  assert.strictEqual(run(sample).f, 492)
  assert.strictEqual(run(sample).g, 114)
  assert.strictEqual(run(sample).x, 123)
  assert.strictEqual(run(sample).y, 456)
  assert.strictEqual(run(sample).h, 65_412)
  assert.strictEqual(run(sample).i, 65_079)
})

test('Day 07 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input).a, 16_076)
  assert.strictEqual(run(input, { b: 16_076 }).a, 2797)
})
