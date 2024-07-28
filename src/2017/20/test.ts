import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 20 — Sample', () => {
  const sample = $.sample(`
  p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
  p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>
  `)

  assert.strictEqual(run(sample), 0)
})

test('Day 20 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 364)
  assert.strictEqual(run(input, true), 420)
})
