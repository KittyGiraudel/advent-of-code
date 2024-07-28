import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 12 — Sample', () => {
  const sample = $.sample(`
  cpy 41 a
  inc a
  inc a
  dec a
  jnz a 2
  dec a
  `)

  assert.strictEqual(run(sample), 42)
})

test('Day 12 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input, 0), 317_993)
  assert.strictEqual(run(input, 1), 9_227_647)
})
