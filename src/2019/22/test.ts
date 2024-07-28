import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { shuffle } from './'

test('Day 22 — Sample', () => {
  const sampleA = $.sample(`
  deal with increment 7
  deal into new stack
  deal into new stack
  `)

  const sampleB = $.sample(`
  cut 6
  deal with increment 7
  deal into new stack
  `)

  const sampleC = $.sample(`
  deal with increment 7
  deal with increment 9
  cut -2
  `)

  const sampleD = $.sample(`
  deal into new stack
  cut -2
  deal with increment 7
  cut 8
  cut -4
  deal with increment 7
  cut 3
  deal with increment 9
  deal with increment 3
  cut -1
  `)

  assert.strictEqual(shuffle(sampleA, 10).join(' '), '0 3 6 9 2 5 8 1 4 7')
  assert.strictEqual(shuffle(sampleB, 10).join(' '), '3 0 7 4 1 8 5 2 9 6')
  assert.strictEqual(shuffle(sampleC, 10).join(' '), '6 3 0 7 4 1 8 5 2 9')
  assert.strictEqual(shuffle(sampleD, 10).join(' '), '9 2 5 8 1 4 7 0 3 6')
})

test('Day 22 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(
    shuffle(input).findIndex(c => c === 2019),
    6696
  )
})
