import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 20 — Sample', () => {
  const sample = $.sample(
    `
    broadcaster -> a, b, c
    %a -> b
    %b -> c
    %c -> inv
    &inv -> a
    `
  )
  const sampleB = $.sample(
    `
    broadcaster -> a
    %a -> inv, con
    &inv -> b
    %b -> con
    &con -> output
    `
  )

  assert.strictEqual(run(sample), 32_000_000)
  assert.strictEqual(run(sampleB), 11_687_500)
})

test('Day 20 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 794_930_686)
  assert.strictEqual(run(input, true), 244_465_191_362_269)
})
