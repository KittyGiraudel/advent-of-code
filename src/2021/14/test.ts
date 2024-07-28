import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { count } from './'

test('Day 14 — Sample', () => {
  const sample = $.sample(
    `
  NNCB

  CH -> B
  HH -> N
  CB -> H
  NH -> C
  HB -> C
  HC -> B
  HN -> C
  NN -> C
  BH -> H
  NC -> B
  NB -> B
  BN -> B
  BB -> N
  BC -> B
  CC -> N
  CN -> C
  `,
    { delimiter: '\n\n' }
  )

  assert.strictEqual(count(sample, 10), 1588)
  assert.strictEqual(count(sample, 40), 2_188_189_693_529)
})

test('Day 14 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  assert.strictEqual(count(input, 10), 2321)
  assert.strictEqual(count(input, 40), 2_399_822_193_707)
})
