import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 17 — Sample', () => {
  const sampleA = $.sample(
    `
    Register A: 729
    Register B: 0
    Register C: 0

    Program: 0,1,5,4,3,0
    `
  )
  const sampleB = $.sample(
    `
    Register A: 2024
    Register B: 0
    Register C: 0

    Program: 0,3,5,4,3,0
    `
  )

  assert.strictEqual(run(sampleA), '4,6,3,5,6,3,5,2,1,0')
  assert.strictEqual(run(sampleB, true), 117440n)
})

test('Day 17 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), '2,7,2,5,1,2,7,3,7')
  assert.strictEqual(run(input, true), 247839002892474n)
})
